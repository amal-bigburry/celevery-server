/**
 * ******************************************************************************************************
 * RegisterUsingGoogleUseCase.ts
 *
 * This injectable class by Bigburry Hypersystems LLP handles user registration via Google OAuth.
 * It interacts with the UserRepository to create or fetch a user based on Google-provided details,
 * then returns a signed JWT access token for the authenticated user.
 * ******************************************************************************************************
 */
import { HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { USER_REPOSITORY } from '../../tokens/userRepository.token';
import { IOTPVerifyingService } from '../interfaces/otp-verifying-service.interface';
import { OTP_VERIFICATION_SERVICE } from '../../tokens/otpVerifyingservice.token';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RegisterUsingGoogleUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(OTP_VERIFICATION_SERVICE)
    private readonly OTPVerifyingService: IOTPVerifyingService, // If OTP needed, else remove
    private readonly jwtService: JwtService,
  ) {}
  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts Google user data (email, profile URL, display name), creates or fetches the user in the system,
   * and returns a signed JWT access token.
   * **************************************************************************************************
   */
  @HttpCode(HttpStatus.CREATED)
  async execute(data: {
    email: string;
    profile_url: string;
    display_name: string;
  }): Promise<{ access_token: string }> {
    // If OTP verification is not relevant here, consider removing OTPVerifyingService injection
    const user = await this.userRepo.createGoogleUser(
      data.email,
      data.profile_url,
      data.display_name,
    );
    if (!user) {
      // Optionally throw an exception or return a failure response
      throw new Error('User creation failed');
    }
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
