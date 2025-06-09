/**
 * ******************************************************************************************************
 * UpdatePasswordUsecase.ts
 *
 * This injectable class by Bigburry Hypersystems LLP handles the use case for updating a user's password.
 * It uses dependency injection to interact with the UserRepository and OTP verification service,
 * maintaining separation of concerns between business logic and data access.
 *
 * The execute method accepts a ResetPasswordDto containing user info and OTP, verifies the OTP, updates the password,
 * and returns a boolean indicating the success of the operation.
 * ******************************************************************************************************
 */
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { ResetPasswordDto } from '../../../../common/dtos/ResetPassword.dto';
import { USER_REPOSITORY } from '../../tokens/user.token';
import { OTP_VERIFICATION_SERVICE } from '../../tokens/otp-verifying-service.token';
import { IOTPVerifyingService } from '../interfaces/otp-verifying-service.interface';
@Injectable()
export class UpdatePasswordUsecase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(OTP_VERIFICATION_SERVICE)
    private readonly OTPVerifyingService: IOTPVerifyingService,
  ) {}
  /**
   * Verifies the OTP and updates the user's password if verification succeeds.
   * @param resetPasswordDto - DTO containing email, new password, OTP, and UUID
   * @returns boolean indicating success or failure of the password update
   */
  async execute(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    const isVerified = await this.OTPVerifyingService.verify(
      resetPasswordDto.UUID,
      resetPasswordDto.OTP,
    );
    if (isVerified) {
      await this.userRepo.updatePassword(resetPasswordDto.email, resetPasswordDto.password);
      return true;
    } else {
      return false;
    }
  }
}
