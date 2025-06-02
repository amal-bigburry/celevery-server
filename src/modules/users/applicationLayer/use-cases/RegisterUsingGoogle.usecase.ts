/**
 * ******************************************************************************************************
 * RegisterUseCase.ts
 *
 * This injectable class by Bigburry Hypersystems LLP encapsulates the user registration use case. It uses
 * dependency injection to interact with the UserRepository for creating new user records in the system.
 *
 * The execute method accepts a RegisterDto containing user registration details, calls the repository to
 * create the user, and returns an object wrapping the created user data. If creation fails, it returns an
 * empty object.
 * ******************************************************************************************************
 */

import { BadRequestException, HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { RegisterDto } from '../../dtos/Register.dto';
import { USER_REPOSITORY } from '../../tokens/userRepository.token';
import { IOTPVerifyingService } from '../interfaces/IOTPVerifyingService.interface';
import { OTP_VERIFICATION_SERVICE } from '../../tokens/otpVerifyingservice.token';
import { JwtService } from '@nestjs/jwt';

/**
 * ******************************************************************************************************
 * RegisterUseCase Class
 *
 * Manages the user registration process at Bigburry Hypersystems LLP by delegating user creation tasks to
 * the repository layer, ensuring clean separation of concerns.
 * ******************************************************************************************************
 */
@Injectable()
export class RegisterUsingGoogleUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(OTP_VERIFICATION_SERVICE)
    private readonly OTPVerifyingService: IOTPVerifyingService,
    private jwtService: JwtService,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts registration data encapsulated in RegisterDto, calls the repository to create a new user, and
   * returns the created user wrapped in an object. Provides fallback to an empty object if user creation fails.
   * **************************************************************************************************
   */
  @HttpCode(HttpStatus.CREATED)
  async execute(data: any): Promise<{ access_token: string }> {
    const user = await this.userRepo.createGoogleUser(
      data.email,
      data.profile_url,
      data.display_name,
    );

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
    //   return { user: user ? user : {} };
  }
}
