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
import mongoose, { Model } from 'mongoose';
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';
import { UserRepository } from 'src/modules/users/applicationLayer/interfaces/user.interface';
import { RegisterDto } from 'src/modules/users/dtos/Register.dto';
import { TokenDto } from 'src/modules/users/dtos/token.dto';
import { BadRequestException } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
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
   * **************************************************************************************************
   * createGoogleUser Method
   *
   * Creates a new user using Google authentication details. If a user with the given email already exists,
   * returns a message indicating so. Otherwise, creates a new user with the provided email, profile_url,
   * and display_name, and returns a success message.
   * **************************************************************************************************
   */
  async createGoogleUser(email: string, profile_url: string, display_name: string): Promise<string> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('User already exists')
    }

    // Create new user with Google details (no password)
    const newUser = new this.userModel({
      email,
      profile_url,
      display_name,
      password: '', // No password for Google users
      contact_number: '',
      contact_number_isVerified: false,
      fcm_token: '',
      favourites: [],
    });

    await newUser.save();
    return 'Google user created successfully';
  }
  /**
   * **************************************************************************************************
   * updatePassword Method
   *
   * Updates the password for the user identified by userid. Throws BadRequestException if user not found.
   * **************************************************************************************************
   */
  async updatePassword(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({email:email});
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.password = password;
    await user.save();
    return 'Password updated successfully';
  }
  /**
   * **************************************************************************************************
   * findByNumber Method
   *
   * Searches the database for a user document matching the provided contact number. Returns a UserEntity
   * instance if found; otherwise throws BadRequestException.
   * **************************************************************************************************
   */
  async findByNumber(number: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .findOne({ contact_number: number })
      .exec();
    if (!user) {
      return null; // Return null instead of throwing an error
    }
    return user;
  }

  async updateContactNumber(
    userid: string,
    contact_number: string,
  ): Promise<string> {
    const user = await this.userModel.findById(userid);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Ensure fields are updated or created
    user.set({
      contact_number,
      contact_number_isVerified: false,
    });

    await user.save();
    return 'Contact number updated';
  }

  async addFavourite(userid: string, cake_id: string): Promise<string> {
    let user = await this.userModel.findById(userid);
    let cake = await this.getCakeDetailsUsecase.execute(cake_id);
    if (!cake) {
      throw new BadRequestException('Invalid cake id');
    }
    let existing = await user?.favourites.filter((cakeid) => cakeid == cake_id);
    // if(existing){
    //   throw new BadRequestException("already exist in your favorites")
    // }
    user?.favourites?.push(cake_id);
    user?.save();
    return 'added';
  }
  async removeFavourite(userid: string, cake_id: string): Promise<string> {
    let user = await this.userModel.findById(userid);
    if (!user) {
      throw new BadRequestException('user id not found');
    }
    let favourites = user?.favourites;
    let indexOfcakeid = favourites?.indexOf(cake_id, 0);
    // console.log(favourites, cake_id)
    if (indexOfcakeid >= 0) {
      favourites?.splice(indexOfcakeid, 1); // Removes 1 element at the found index
    }
    user.favourites = favourites;
    user.save();
    return 'removed';
  }
  async getFavourite(userid: string): Promise<CakeEntity[]> {
    const user = await this.userModel.findById(userid).lean(); // lean() for performance
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

  async updateProfileImage(userid: string, file: any): Promise<string> {
    let url = await this.uploadImage(file);
    let user = await this.userModel.findById(userid);
    if (user) {
      user.profile_url = url;
      user.save();
    }
    // console.log(res, url, userid);
    return 'updated';
  }

  /**
   * **************************************************************************************************
   * findByEmail Method
   *
   * Searches the database for a user document matching the provided email. Returns a UserEntity
   * instance if found; otherwise returns null.
   * **************************************************************************************************
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
   * **************************************************************************************************
   * findById Method
   *
   * Retrieves a user document by its unique identifier and returns it directly. Returns null if not found.
   * **************************************************************************************************
   */
  async findById(userid: string): Promise<UserEntity | null> {
    const user = this.userModel.findById(userid).exec();
    return user;
  }

  /**
   * **************************************************************************************************
   * createUser Method
   *
   * Creates a new user document in the database after verifying the email does not already exist.
   * Throws a BadRequestException if a user with the same email exists.
   * **************************************************************************************************
   */
  async createUser(RegisterDto: RegisterDto): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: RegisterDto.email })
      .exec();
    if (user) throw new BadRequestException('User already exists');
    // Hash the password
    const saltRounds = 10; // Adjust based on security needs (10 is a good default)
    const hashedPassword = await bcrypt.hash(RegisterDto.password, saltRounds);

    // Create new user with hashed password
    const newUser = new this.userModel({
      ...RegisterDto,
      password: hashedPassword, // Replace plain password with hashed password
    });
    return newUser.save();
  }

  /**
   * **************************************************************************************************
   * updatefcm Method
   *
   * Updates the FCM token for the user identified by userid. Returns 'ok' if successful, otherwise returns an empty string.
   * **************************************************************************************************
   */
  async updatefcm(userid: string, token: TokenDto): Promise<string> {
    let user = await this.userModel.findByIdAndUpdate(userid, token).exec();
    if (!user) return '';
    return 'ok';
  }

  /**
   * **************************************************************************************************
   * getfcm Method
   *
   * Retrieves the FCM token associated with the user identified by userid. Returns an empty string if user not found.
   * **************************************************************************************************
   */
  async getfcm(userid: string): Promise<string> {
    const user = await this.userModel.findById(userid).exec();
    if (!user) return '';
    return user.fcm_token;
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    let s3Url = '';
    try {
      const s3 = new S3Client({
        region: this.configService.get<string>('AWS_REGION'), // ap-south-1
        forcePathStyle: false, // ✅ correct URL style
        endpoint: `https://s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com`,
        credentials: {
          accessKeyId: `${this.configService.get<string>('AWS_ACCESS_KEY')}`, // e.g., 'AKIAIOSFODNN7EXAMPLE'
          secretAccessKey: `${this.configService.get<string>('AWS_SECRET_KEY')}`, // e.g., 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
        },
      });
      let fileExtension = extname(file.originalname);
      const s3FileName = `${randomUUID()}${fileExtension}`;
      const uploadResult = await s3.send(
        new PutObjectCommand({
          Bucket: `${this.configService.get<string>('AWS_BUCKET_NAME')}`, // e.g., 'my-bucket'
          Key: s3FileName,
          Body: file.buffer, // 👈 Multer gives buffer directly
          ContentType: file.mimetype,
        }),
      );
      s3Url = `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${s3FileName}`;
      return s3Url;
    } catch (error) {
      console.error('S3 Upload Error:', error); // 🔥 This will show the actual reason
      throw new BadRequestException('Image Not saved, Aws not Connected');
    }
  }
}
