/**
 * importing the required packages
 */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { UserEntity } from '../../domainLayer/entities.ts/user.entity';
import { USER_REPOSITORY } from '../tokens/userRepository.token';
/**
 * injectable to get the user details
 */
@Injectable()
export class GetUserDetailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}
  /**
   * function to execute
   */
  async execute(userid: string): Promise<UserEntity> {
    const user = await this.userRepo.findById(userid);
    if (!user) {
      throw new BadRequestException('Invalid user id');
    } else {
      return new UserEntity(
        user._id.toString(),
        user.display_name,
        user.contact_number, // display_name
        user.email,
        user.password,
        user.fcm_token,
      ); // id;
    }
  }
}
