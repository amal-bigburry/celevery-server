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

import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
export class LoginUsingGoogleUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
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
  async execute(data: any): Promise<{ access_token: string }> {
    // const user = await this.userRepo.createGoogleUser(
    //   data.email,
    //   data.profile_url,
    //   data.display_name,
    // );
    const user = await this.userRepo.findByEmail(data.email);

    // If user is not found, throw an error
    if (!user) {
      throw new UnauthorizedException('user Not found Register first');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
    //   return { user: user ? user : {} };
  }
}
