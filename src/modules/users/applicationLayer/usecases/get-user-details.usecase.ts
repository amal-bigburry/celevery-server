/**
 * ******************************************************************************************************
 * GetUserDetailUseCase.ts
 *
 * This injectable class by Bigburry Hypersystems LLP provides the use case to retrieve detailed user information
 * based on a user ID. It utilizes dependency injection to interact with the UserRepository, ensuring clean
 * separation between business logic and data access layers.
 *
 * The execute method asynchronously fetches the user data, validates its existence, and constructs a UserEntity
 * object for consistent data representation. In case the user is not found, it throws an UnauthorizedException
 * to handle invalid requests gracefully.
 * ******************************************************************************************************
 */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { USERINTERFACETOKEN } from '../../tokens/user.token';
import { UserEntity } from '../../domainLayer/entities.ts/user.entity';
import { GetUserDetailInterface } from 'src/common/interfaces/get-user-details.interface';
@Injectable()
export class GetUserDetailUseCase implements GetUserDetailInterface {
  constructor(
    @Inject(USERINTERFACETOKEN) private readonly userRepo: UserInterface,
  ) {}
  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts a user ID, fetches the corresponding user from the repository, and returns a UserEntity object.
   * Throws UnauthorizedException if the user is not found.
   * **************************************************************************************************
   */
  async execute(userId: string): Promise<UserEntity> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }
    return new UserEntity(
      user._id.toString(),
      user.display_name,
      user.contact_number,
      user.contact_number_isVerified,
      user.email,
      user.password,
      user.fcm_token,
      user.profile_url,
      user.favourites,
    );
  }
}
