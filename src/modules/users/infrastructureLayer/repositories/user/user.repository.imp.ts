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
import { UserRepository } from 'src/modules/users/applicationLayer/repositories/user.repositoty';
import { RegisterDto } from 'src/modules/users/UserDtos/Register.dto';
import { TokenDto } from 'src/modules/users/UserDtos/token.dto';
import { BadRequestException } from '@nestjs/common';

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
  constructor(@InjectModel('Users') private userModel: Model<UserEntity>) {}

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
    const user = await this.userModel.findOne({ email: RegisterDto.email }).exec();
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
}
