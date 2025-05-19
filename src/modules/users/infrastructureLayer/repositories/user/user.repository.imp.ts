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
import { UserRepository } from 'src/modules/users/applicationLayer/repositories/user.repositoty';
import { RegisterDto } from 'src/modules/users/UserDtos/Register.dto';
import { TokenDto } from 'src/modules/users/UserDtos/token.dto';
import { BadRequestException } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';

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
  async addFavourite(userid: string, cake_id: string): Promise<string> {
    let user = await this.userModel.findById(userid);
    user?.favourites?.push(cake_id);
    user?.save();
    return 'added';
  }
  async removeFavourite(userid: string, cake_id: string): Promise<string> {
    let user = await this.userModel.findById(userid);
    let favourites = user?.favourites;
    let indexOfcakeid = favourites?.indexOf(cake_id);
    if (indexOfcakeid) {
      favourites?.splice(indexOfcakeid, 1); // Removes 1 element at the found index
    }
    return 'removed';
  }
  async getFavourite(userid: string): Promise<Array<CakeEntity>> {
    const user = await this.userModel.findById(userid);
    if (!user) return [];

    const cake_ids = Array.isArray(user.favourites) ? user.favourites : [];

    const cakeDetails: CakeEntity[] = [];

    // console.log('cakeids', cake_ids)

    for (const cake_id of cake_ids) {
      console.log(cake_id)
      const cake = await this.getCakeDetailsUsecase.execute(cake_id);
      if (cake) {
        cakeDetails.push(cake);
      }
    }

    return cakeDetails;
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
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;
    return new UserEntity(
      user._id.toString(),
      user.display_name,
      user.contact_number,
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
    const newUser = new this.userModel(RegisterDto);
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
