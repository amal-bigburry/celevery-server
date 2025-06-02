/**
 * ******************************************************************************************************
 * UpdatefcmUseCase.ts
 *
 * This injectable class by Bigburry Hypersystems LLP handles the use case for updating the Firebase Cloud Messaging
 * (FCM) token associated with a user. It uses dependency injection to interact with the UserRepository,
 * maintaining separation of concerns between business logic and data access.
 *
 * The execute method takes a user ID and a TokenDto, calls the repository to update the stored FCM token, and
 * returns a status string indicating the result of the operation.
 * ******************************************************************************************************
 */

import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REGISTER_OTP_TOKEN } from '../../tokens/ResiterOTP.token';
import { OTPStorageRepository } from '../interfaces/otpStorage.repository';

/**
 * ******************************************************************************************************
 * UpdatefcmUseCase Class
 *
 * Manages the update process of the FCM token for a user within the Bigburry Hypersystems LLP system, ensuring
 * push notification tokens are current and valid.
 * ******************************************************************************************************
 */
@Injectable()
export class OTPVerifyingService {
  constructor(
    @Inject(REGISTER_OTP_TOKEN)
    private readonly OTPStorageRepository: OTPStorageRepository,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts a user ID and a TokenDto representing the new FCM token, updates the repository with this token,
   * and returns a string indicating the outcome of the update operation.
   * **************************************************************************************************
   */
  async verify(UUID: string, OTP: string): Promise<boolean> {
    const otp = await this.OTPStorageRepository.get(UUID);
    const isUsed = await this.OTPStorageRepository.isUsed(UUID)
    if(isUsed){
      throw new UnauthorizedException("Invalid OTP")
    }
    if (OTP == otp) {
      await this.OTPStorageRepository.markAsUsed(UUID)
      return true;
    } else {
      return false;
    }
  }
}
