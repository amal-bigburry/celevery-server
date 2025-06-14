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
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REGISTER_OTP_TOKEN } from '../../tokens/ResiterOTP.token';
import { OTPStorageRepository } from '../interfaces/otp-storage.interface';
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
  async verify(UUID: string, OTP: string): Promise<object> {
    const otp = await this.OTPStorageRepository.get(UUID);
    const isUsed = await this.OTPStorageRepository.isUsed(UUID);
    if (isUsed) {
      throw new UnauthorizedException('Invalid OTP');
    }
    if (OTP == otp) {
      // await this.OTPStorageRepository.markAsUsed(UUID)
      return { isValidOTP: true };
    } else {
      return { isValidOTP: false };
    }
  }
}
