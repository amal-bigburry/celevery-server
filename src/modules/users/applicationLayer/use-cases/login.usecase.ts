/**
 * importing the required packages
 */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../UserDtos/Login.dto';
import { USER_REPOSITORY } from '../tokens/userRepository.token';
/**
 * injectable to login the user
 */
@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  /**
   * executable function
   */
  async execute(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findByEmail(loginDto.email);
    // console.log(user)
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
