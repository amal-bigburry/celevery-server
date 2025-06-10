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
import { UserInterface } from 'src/modules/users/applicationLayer/interfaces/user.interface';
import { RegisterDto } from 'src/common/dtos/Register.dto';
import { TokenDto } from 'src/common/dtos/token.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/get-cake-details.usecase';
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
@Injectable()
export class UserRepositoryImpl implements UserInterface {
  constructor(
    @InjectModel('Users') private userModel: Model<UserEntity>,
    private readonly configService: ConfigService,
    private readonly getCakeDetailsUsecase: GetCakeDetailsUseCase,
  ) {}
  /**
   * Updates the display name for a user identified by email.
   * @param email - The user's email address.
   * @param display_name - The new display name to set.
   * @returns A success message upon successful update.
   * @throws BadRequestException if the user is not found.
   */
  async updateDisplayName(
    user_id: string,
    display_name: string,
  ): Promise<string> {
    const user = await this.userModel.findById(user_id).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.display_name = display_name;
    await user.save();
    return 'Display name updated successfully';
  }
  /**
   * Creates a new user using Google authentication.
   * @param email - string
   * @param profile_url - string
   * @param display_name - string
   * @returns Promise<UserEntity>
   */
  /**
   * Creates a new user account using Google authentication details.
   * @param email - The email address from Google.
   * @param profile_url - URL to the user's Google profile picture.
   * @param display_name - Display name from the Google account.
   * @returns The newly created user.
   * @throws ConflictException if the user already exists.
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
   * Updates the password for a user identified by email.
   * @param email - The user's email address.
   * @param password - The new password to set.
   * @returns A success message upon successful update.
   * @throws UnauthorizedException if the user is not found.
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
   * Finds a user by their contact number.
   * @param number - The user's contact number.
   * @returns The user entity if found, otherwise null.
   */
  async findByNumber(number: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ contact_number: number }).exec();
  }
  /**
   * Updates a user's contact number and resets verification status.
   * @param userid - The user's unique ID.
   * @param contact_number - The new contact number to set.
   * @returns A success message after updating.
   * @throws BadRequestException if the user is not found.
   */
  async updateContactNumber(
    userid: string,
    contact_number: string,
  ): Promise<string> {
    const user = await this.userModel.findById(userid);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.set({ contact_number, contact_number_isVerified: false });
    await user.save();
    return 'Contact number updated';
  }
  /** Adds a cake to the user's list of favourites.
   * @param userid - The ID of the user.
   * @param cake_id - The ID of the cake to be added.
   * @returns A success message upon addition.
   * @throws NotFoundException if the user does not exist.
   * @throws BadRequestException if the cake ID is invalid.
   * @throws ConflictException if the cake is already in the user's favourites. */
  async addFavourite(userid: string, cake_id: string): Promise<string> {
    const user = await this.userModel.findById(userid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const cake = await this.getCakeDetailsUsecase.execute(cake_id);
    if (!cake) {
      throw new BadRequestException('Invalid cake id');
    }
    if (user.favourites.includes(cake_id)) {
      throw new ConflictException('Already exists in your favourites');
    }
    user.favourites.push(cake_id);
    await user.save();
    return 'Cake added to favourites';
  }
  /** Removes a cake from the user's favourites.
   * @param userid - The user ID.
   * @param cake_id - The cake ID to remove.
   * @returns A success message.
   * @throws BadRequestException if user not found. */
  async removeFavourite(userid: string, cake_id: string): Promise<string> {
    const user = await this.userModel.findById(userid);
    if (!user) {
      throw new BadRequestException('user id not found');
    }
    const index = user.favourites.indexOf(cake_id);
    if (index >= 0) {
      user.favourites.splice(index, 1);
    }
    await user.save();
    return 'removed';
  }
  async getFavourite(userid: string): Promise<CakeEntity[]> {
    const user = await this.userModel.findById(userid).lean();
    if (!user?.favourites?.length) return [];
    const cakes = await Promise.all(
      user.favourites.map((cake_id) =>
        this.getCakeDetailsUsecase.execute(cake_id).catch((err) => {
          console.error(`Error fetching cake with ID ${cake_id}:`, err);
          return null;
        }),
      ),
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
    const url = await this.uploadImage(file);
    const user = await this.userModel.findById(userid);
    if (user) {
      user.profile_url = url;
      await user.save();
    }
    return 'updated';
  }
  /**
   * Finds user by email.
   * @param email - string
   * @returns Promise<UserEntity>
   * @throws BadRequestException if user not found
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
    const user = await this.userModel.findById(userid).exec();
    return user;
  }
  /**
   * Creates a new user with registration data.
   * @param RegisterDto - RegisterDto
   * @returns Promise<UserEntity>
   * @throws ConflictException if user already exists
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
    const user = await this.userModel
      .findByIdAndUpdate(userid, { fcm_token: token.fcm_token })
      .exec();
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
