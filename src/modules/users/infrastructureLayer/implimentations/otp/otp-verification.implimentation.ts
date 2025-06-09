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
import { Injectable } from '@nestjs/common';
import { IOTPVerifyingService } from 'src/modules/users/applicationLayer/interfaces/otp-verifying-service.interface';
import { OTPVerifyingService } from 'src/modules/OTP/applicationLayer/usecases/verify.usecase';
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
  constructor(private readonly OTPVerifyingService: OTPVerifyingService) {}
  async verify(UUID: string, OTP: string): Promise<object> {
    return await this.OTPVerifyingService.verify(UUID, OTP);
  }
}
