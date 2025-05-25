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
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase';
import { OTPStorageRepository } from '../../applicationLayer/repositories/otpStorage.repository';
import { OTPStorageEntity } from 'src/modules/OTP/domainLayer/entities/otpStorage.entity';
/**
 * ******************************************************************************************************
 * UserRepositoryImpl Class
 *
 * Implements UserRepository interface with methods to handle user data persistence using Mongoose.
 * Injects the 'Users' model for database operations. Methods ensure proper transformation between
 * database documents and domain entities, including error management for duplicate users.
 * ******************************************************************************************************
 */
export class OTPStorageRepositoryImp implements OTPStorageRepository {
  constructor(
    @InjectModel('OTPStorage') private OTPStorageModel: Model<OTPStorageEntity>,
    private readonly configService: ConfigService,
  ) {}
  async isUsed(UUID: string): Promise<boolean> {
    const otpDoc = await this.OTPStorageModel.findOne({ UUID }).exec();
    if (otpDoc?.used) {
      return true;
    }
    return false;
  }

  async isUUIDExist(UUID: string): Promise<boolean> {
    const otpDoc = await this.OTPStorageModel.findOne({ UUID }).exec();
    if (otpDoc) {
      return true;
    }
    return false;
  }

  async increaseAttempt(UUID: string, currentAttemps: number): Promise<number> {
    const otpDoc = await this.OTPStorageModel.findOneAndUpdate(
      { UUID },
      { attempts: currentAttemps + 1 },
    ).exec();
    if (otpDoc) {
      return otpDoc.attempts;
    }
    throw new BadRequestException('UUID not found');
  }

  async getOTPDocOf(UUID: string): Promise<OTPStorageEntity> {
    const otpDoc = await this.OTPStorageModel.findOne({ UUID }).exec();
    if (otpDoc) {
      return otpDoc;
    }
    throw new BadRequestException('Invalid UUID');
  }

  async updateLastRequestTime(UUID: string, time: Date): Promise<boolean> {
    const result = await this.OTPStorageModel.updateOne(
      { UUID },
      { $set: { last_request_time: time } },
    ).exec();

    return result.modifiedCount > 0;
  }

  async markAsUsed(UUID: string): Promise<string> {
    const otpDoc = await this.OTPStorageModel.findOneAndUpdate(
      { UUID },
      { $set: { used: true } },
      { new: true },
    ).exec();
    if (!otpDoc) {
      throw new BadRequestException('OTP not found');
    }
    return otpDoc.OTP;
  }

  async create(UUID: string, OTP: string): Promise<string> {
    const otpDoc = await this.OTPStorageModel.create({ UUID: UUID, OTP: OTP });
    return OTP;
  }

  async get(UUID: string): Promise<string> {
    const otpDoc = await this.OTPStorageModel.findOne({ UUID }).exec();
    if (!otpDoc) {
      throw new BadRequestException('Invalid OTP');
    }
    return otpDoc.OTP;
  }
}
