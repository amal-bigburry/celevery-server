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
import { BadRequestException, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import * as bcrypt from 'bcrypt';
import { IOTPVerifyingService } from 'src/modules/users/applicationLayer/interfaces/IOTPVerifyingService.interface';
import { OTPVerifyingService } from 'src/modules/OTP/applicationLayer/usecases/Verify.usecase';
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
export class IOTPVerifyingServiceImp implements IOTPVerifyingService {
  constructor(
    private readonly OTPVerifyingService: OTPVerifyingService,
  ) {}
    async verify(UUID: string, OTP: string): Promise<boolean> {
        return await this.OTPVerifyingService.verify(UUID, OTP)
    }
  /**
   * **************************************************************************************************
   * updatePassword Method
   *
   * Updates the password for the user identified by userid. Throws BadRequestException if user not found.
   * **************************************************************************************************
   */
}