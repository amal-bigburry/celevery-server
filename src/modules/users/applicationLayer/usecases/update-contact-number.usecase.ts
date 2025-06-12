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
import { UserInterface } from '../interfaces/user.interface';
import { USERINTERFACETOKEN } from '../../tokens/user.token';
import { OtpVerificationInterface } from '../../../../common/interfaces/otp-verifying-service.interface';
import { OTP_VERIFICATION_SERVICE } from '../../tokens/otp-verifying-service.token';
import { UpdateContactNumberDto } from 'src/common/dtos/update-contact-number.dto';
/**
 * ******************************************************************************************************
 * UpdatefcmUseCase Class
 *
 * Manages the update process of the FCM token for a user within the Bigburry Hypersystems LLP system, ensuring
 * push notification tokens are current and valid.
 * ******************************************************************************************************
 */
@Injectable()
export class UpdateContactNumberUsecase {
  constructor(
    @Inject(USERINTERFACETOKEN) private readonly userRepo: UserInterface,
    @Inject(OTP_VERIFICATION_SERVICE)
    private readonly OTPVerifyingService: OtpVerificationInterface,
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
    userid: string,
    UpdateContactNumberDto: UpdateContactNumberDto,
  ): Promise<boolean> {
    let existing = await this.userRepo.findById(userid);
    if (!existing) {
      throw new UnauthorizedException('User not found');
    }
    let isVerified = await this.OTPVerifyingService.verify(
      UpdateContactNumberDto.UUID,
      UpdateContactNumberDto.OTP,
    );
    if (isVerified) {
      const user = await this.userRepo.updateContactNumber(
        userid,
        UpdateContactNumberDto.number,
      );
      return true;
    } else {
      return false;
    }
  }
}
