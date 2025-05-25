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

import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { TokenDto } from '../../dtos/token.dto';
import { USER_REPOSITORY } from '../../tokens/userRepository.token';
import { ResetPasswordDto } from '../../dtos/ResetPassword.dto';
import { OTP_VERIFICATION_SERVICE } from '../../tokens/otpVerifyingservice.token';
import { IOTPVerifyingService } from '../interfaces/IOTPVerifyingService.interface';

/**
 * ******************************************************************************************************
 * UpdatefcmUseCase Class
 *
 * Manages the update process of the FCM token for a user within the Bigburry Hypersystems LLP system, ensuring
 * push notification tokens are current and valid.
 * ******************************************************************************************************
 */
@Injectable()
export class Update_passwordUsecase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(OTP_VERIFICATION_SERVICE)
    private readonly OTPVerifyingService: IOTPVerifyingService,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts a user ID and a TokenDto representing the new FCM token, updates the repository with this token,
   * and returns a string indicating the outcome of the update operation.
   * **************************************************************************************************
   */
  async execute(
    ResetPasswordDto: ResetPasswordDto,
  ): Promise<boolean> {
    let isVerified = await this.OTPVerifyingService.verify(
      ResetPasswordDto.UUID,
      ResetPasswordDto.OTP,
    );
    if (isVerified) {
      await this.userRepo.updatePassword(ResetPasswordDto.email, ResetPasswordDto.password);
      return true;
    } else {
      return false;
    }
  }
}
