/**
 * ******************************************************************************************************
 * LoginUsingGoogleUseCase.ts
 *
 * This injectable class by Bigburry Hypersystems LLP manages the login process for users authenticating via
 * Google OAuth. It leverages the UserRepository to find users by email and issues JWT tokens for valid users.
 *
 * If the user is not found, it throws an UnauthorizedException prompting registration first.
 * ******************************************************************************************************
 */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { USER_REPOSITORY } from '../../tokens/user.token';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginUsingGoogleUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * **************************************************************************************************
   * execute Method
   *
   * Attempts to login a user by their Google-provided email. If the user exists, a JWT token is issued.
   * Otherwise, an UnauthorizedException is thrown indicating the user should register first.
   * **************************************************************************************************
   */
  async execute(data: {
    email: string;
    profile_url?: string;
    display_name?: string;
  }): Promise<{ access_token: string }> {
    // Find user by email provided by Google
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      // User does not exist - ask them to register first
      throw new UnauthorizedException('User not found. Please register first.');
    }
    // Issue JWT token for the authenticated user
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
