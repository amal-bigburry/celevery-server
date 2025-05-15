/**
 * importing the requierd packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { TokenDto } from '../../UserDtos/token.dto';
import { USER_REPOSITORY } from '../tokens/userRepository.token';
/**
 * injectable to update the fcm
 */
@Injectable()
export class UpdatefcmUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}
  /**\
   * function to execute
   */
  async execute(userid: string, token: TokenDto): Promise<string> {
    const user = await this.userRepo.updatefcm(userid, token);
    return user;
  }
}
