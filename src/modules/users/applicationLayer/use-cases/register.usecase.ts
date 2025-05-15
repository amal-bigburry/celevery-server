/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { RegisterDto } from '../../UserDtos/Register.dto';
import { USER_REPOSITORY } from '../tokens/userRepository.token';
/**
 * injectable to register the user
 */
@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}
  /**
   * functio to execute
   */
  async execute(RegisterDto: RegisterDto): Promise<{ user: object }> {
    const user = await this.userRepo.createUser(RegisterDto);
    return { user: user ? user : {} };
  }
}
