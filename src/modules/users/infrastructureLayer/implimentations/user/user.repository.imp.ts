// © Bigburry Hypersystems LLP
/**
 * ******************************************************************************************************
 * UserRepositoryImpl.ts
 *
 * This file contains the implementation of the UserRepository interface for Bigburry Hypersystems LLP. It
 * interacts with the MongoDB database using Mongoose models to perform CRUD operations related to User entities.
 *
 * The class provides methods to find users by email or ID, create new users, update FCM tokens, and retrieve FCM tokens,
 * encapsulating data access logic and error handling as per application requirements.
 * ******************************************************************************************************
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';
import { UserRepository } from 'src/modules/users/applicationLayer/interfaces/user.interface';
import { RegisterDto } from 'src/modules/users/dtos/Register.dto';
import { TokenDto } from 'src/modules/users/dtos/token.dto';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import * as bcrypt from 'bcrypt';
/**
 * ******************************************************************************************************
 * UserRepositoryImpl Class
 *
 * Implements UserRepository interface with methods to handle user data persistence using Mongoose.
 * Injects the 'Users' model for database operations. Methods ensure proper transformation between
 * database documents and domain entities, including error management for duplicate users.
 * ******************************************************************************************************
 */
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('Users') private userModel: Model<UserEntity>,
    private readonly configService: ConfigService,
    private readonly getCakeDetailsUsecase: GetCakeDetailsUseCase,
  ) {}
  /**
   * Creates a new user using Google authentication.
   * @param email - string
   * @param profile_url - string
   * @param display_name - string
   * @returns Promise<UserEntity>
   */
  async createGoogleUser(
    email: string,
    profile_url: string,
    display_name: string,
  ): Promise<UserEntity> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const newUser = new this.userModel({
      email,
      profile_url,
      display_name,
      password: '',
      contact_number: '',
      contact_number_isVerified: false,
      fcm_token: '',
      favourites: [],
    });
    await newUser.save();
    return newUser;
  }
  /**
   * Updates a user's password.
   * @param email - string
   * @param password - string
   * @returns Promise<string>
   */
  async updatePassword(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    user.password = password;
    await user.save();
    return 'Password updated successfully';
  }
  /**
   * Finds user by contact number.
   * @param number - string
   * @returns Promise<UserEntity | null>
   */
  async findByNumber(number: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .findOne({ contact_number: number })
      .exec();
    if (!user) {
      return null;
    }
    return user;
  }
  /**
   * Updates a user's contact number.
   * @param userid - string
   * @param contact_number - string
   * @returns Promise<string>
   */
  async updateContactNumber(
    userid: string,
    contact_number: string,
  ): Promise<string> {
    const user = await this.userModel.findById(userid);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.set({
      contact_number,
      contact_number_isVerified: false,
    });
    await user.save();
    return 'Contact number updated';
  }
  /**
   * Adds a cake to user's favourites.
   * @param userid - string
   * @param cake_id - string
   * @returns Promise<string>
   */
  async addFavourite(userid: string, cake_id: string): Promise<string> {
    let user = await this.userModel.findById(userid);
    let cake = await this.getCakeDetailsUsecase.execute(cake_id);
    if (!cake) {
      throw new BadRequestException('Invalid cake id');
    }
    let existing = await user?.favourites.filter((cakeid) => cakeid == cake_id);
    if (existing) {
      throw new ConflictException('already exist in your favorites');
    }
    user?.favourites?.push(cake_id);
    user?.save();
    return 'added';
  }
  /**
   * Removes a cake from user's favourites.
   * @param userid - string
   * @param cake_id - string
   * @returns Promise<string>
   */
  async removeFavourite(userid: string, cake_id: string): Promise<string> {
    let user = await this.userModel.findById(userid);
    if (!user) {
      throw new BadRequestException('user id not found');
    }
    let favourites = user?.favourites;
    let indexOfcakeid = favourites?.indexOf(cake_id, 0);
    if (indexOfcakeid >= 0) {
      favourites?.splice(indexOfcakeid, 1);
    }
    user.favourites = favourites;
    user.save();
    return 'removed';
  }
  /**
   * Retrieves user's favourite cakes.
   * @param userid - string
   * @returns Promise<CakeEntity[]>
   */
  async getFavourite(userid: string): Promise<CakeEntity[]> {
    const user = await this.userModel.findById(userid).lean();
    if (!user || !Array.isArray(user.favourites)) return [];
    const cake_ids = user.favourites;
    const cakes = await Promise.all(
      cake_ids.map(async (cake_id) => {
        try {
          const cake = await this.getCakeDetailsUsecase.execute(cake_id);
          return cake || null;
        } catch (err) {
          console.error(`Error fetching cake with ID ${cake_id}:`, err);
          return null;
        }
      }),
    );
    return cakes.filter((cake): cake is CakeEntity => cake !== null);
  }
  /**
   * Updates the user's profile image.
   * @param userid - string
   * @param file - any
   * @returns Promise<string>
   */
  async updateProfileImage(userid: string, file: any): Promise<string> {
    let url = await this.uploadImage(file);
    let user = await this.userModel.findById(userid);
    if (user) {
      user.profile_url = url;
      user.save();
    }
    return 'updated';
  }
  /**
   * Finds user by email.
   * @param email - string
   * @returns Promise<UserEntity>
   */
  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new BadRequestException('user not found');
    return new UserEntity(
      user._id.toString(),
      user.display_name,
      user.contact_number,
      user.contact_number_isVerified,
      user.email,
      user.password,
      user.fcm_token,
      user.profile_url,
      user.favourites,
    );
  }
  /**
   * Finds user by ID.
   * @param userid - string
   * @returns Promise<UserEntity | null>
   */
  async findById(userid: string): Promise<UserEntity | null> {
    const user = this.userModel.findById(userid).exec();
    return user;
  }
  /**
   * Creates a new user with registration data.
   * @param RegisterDto - RegisterDto
   * @returns Promise<UserEntity>
   */
  async createUser(RegisterDto: RegisterDto): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: RegisterDto.email })
      .exec();
    if (user) throw new ConflictException('User already exists');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(RegisterDto.password, saltRounds);
    const newUser = new this.userModel({
      ...RegisterDto,
      password: hashedPassword,
    });
    return newUser.save();
  }
  /**
   * Updates FCM token.
   * @param userid - string
   * @param token - TokenDto
   * @returns Promise<string>
   */
  async updatefcm(userid: string, token: TokenDto): Promise<string> {
    let user = await this.userModel.findByIdAndUpdate(userid, token).exec();
    if (!user) return '';
    return 'ok';
  }
  /**
   * Retrieves FCM token.
   * @param userid - string
   * @returns Promise<string>
   */
  async getfcm(userid: string): Promise<string> {
    const user = await this.userModel.findById(userid).exec();
    if (!user) return '';
    return user.fcm_token;
  }
  /**
   * Uploads image to S3 and returns public URL.
   * @param file - Express.Multer.File
   * @returns Promise<string>
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    let s3Url = '';
    try {
      const s3 = new S3Client({
        region: this.configService.get<string>('AWS_REGION'),
        forcePathStyle: false,
        endpoint: `https://s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com`,
        credentials: {
          accessKeyId: `${this.configService.get<string>('AWS_ACCESS_KEY')}`,
          secretAccessKey: `${this.configService.get<string>('AWS_SECRET_KEY')}`,
        },
      });
      let fileExtension = extname(file.originalname);
      const s3FileName = `${randomUUID()}${fileExtension}`;
      const uploadResult = await s3.send(
        new PutObjectCommand({
          Bucket: `${this.configService.get<string>('AWS_BUCKET_NAME')}`,
          Key: s3FileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      s3Url = `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${s3FileName}`;
      return s3Url;
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new BadRequestException('Image Not saved, Aws not Connected');
    }
  }
}
