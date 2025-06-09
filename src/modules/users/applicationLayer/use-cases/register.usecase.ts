/**
 * ******************************************************************************************************
 * RegisterUseCase.ts
 *
 * This injectable class by Bigburry Hypersystems LLP encapsulates the user registration use case. It uses
 * dependency injection to interact with the UserRepository for creating new user records in the system.
 *
 * The execute method accepts a RegisterDto containing user registration details, validates OTP, calls the
 * repository to create the user, and returns a signed JWT token if successful. If user creation fails or
 * OTP verification fails, it handles errors accordingly.
 * ******************************************************************************************************
 */
import { UnauthorizedException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { RegisterDto } from '../../../../common/dtos/Register.dto';
import { USER_REPOSITORY } from '../../tokens/userRepository.token';
import { IOTPVerifyingService } from '../interfaces/otp-verifying-service.interface';
import { OTP_VERIFICATION_SERVICE } from '../../tokens/otpVerifyingservice.token';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(OTP_VERIFICATION_SERVICE)
    private readonly OTPVerifyingService: IOTPVerifyingService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts registration data encapsulated in RegisterDto. Verifies the OTP first, then creates a new user
   * via the UserRepository. Returns a signed JWT token for the created user.
   * Throws UnauthorizedException if OTP verification fails.
   * **************************************************************************************************
   */
  async execute(registerDto: RegisterDto): Promise<{ access_token: string }> {
    const isVerified = await this.OTPVerifyingService.verify(
      registerDto.UUID,
      registerDto.OTP,
    );
    if (!isVerified) {
      throw new UnauthorizedException('Invalid OTP');
    }
    const user = await this.userRepo.createUser(registerDto);
    if (!user) {
      return { access_token: '' };
    }
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
