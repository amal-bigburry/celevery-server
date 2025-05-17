/**
 * ******************************************************************************************************
 * LoginUseCase.ts
 * 
 * This injectable class by Bigburry Hypersystems LLP handles the user login process within the application. 
 * It leverages dependency injection to access the UserRepository for user validation and the JwtService for 
 * generating JWT access tokens.
 * 
 * The execute method receives login credentials, verifies the user's existence and password correctness, and 
 * returns a signed JWT token for authorized access. If validation fails, it throws an UnauthorizedException 
 * to prevent unauthorized access.
 * ******************************************************************************************************
 */

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../UserDtos/Login.dto';
import { USER_REPOSITORY } from '../tokens/userRepository.token';

/**
 * ******************************************************************************************************
 * LoginUseCase Class
 * 
 * Manages the authentication workflow at Bigburry Hypersystems LLP by validating user credentials and issuing 
 * JWT access tokens to successfully authenticated users, enabling secure session management.
 * ******************************************************************************************************
 */
@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   * 
   * Takes LoginDto containing email and password, verifies the credentials against stored user data, and if 
   * valid, returns an access token signed with the user's email and ID as payload. Throws an exception on failure.
   * **************************************************************************************************
   */
  async execute(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findByEmail(loginDto.email);
    if (!user || user.password != loginDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const payload = { email: user.email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
