/**
 * ******************************************************************************************************
 * GetUserDetailUseCase.ts
 * 
 * This injectable class by Bigburry Hypersystems LLP provides the use case to retrieve detailed user information 
 * based on a user ID. It utilizes dependency injection to interact with the UserRepository, ensuring clean 
 * separation between business logic and data access layers.
 * 
 * The execute method asynchronously fetches the user data, validates its existence, and constructs a UserEntity 
 * object for consistent data representation. In case the user is not found, it throws a BadRequestException to 
 * handle invalid requests gracefully.
 * ******************************************************************************************************
 */

import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../interfaces/user.interface';
import { UserEntity } from '../../domainLayer/entities.ts/user.entity';
import { USER_REPOSITORY } from '../../tokens/userRepository.token';

/**
 * ******************************************************************************************************
 * GetUserDetailUseCase Class
 * 
 * Manages the retrieval and validation of user details for Bigburry Hypersystems LLP. It abstracts the 
 * interaction with the user repository and ensures proper error handling when user data is missing.
 * ******************************************************************************************************
 */
@Injectable()
export class GetUserDetailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   * 
   * Accepts a user ID, fetches the corresponding user from the repository, and returns a UserEntity object.
   * Throws an exception if the user ID is invalid or user data is not found, maintaining data integrity.
   * **************************************************************************************************
   */
  async execute(userid: string): Promise<UserEntity> {
    const user = await this.userRepo.findById(userid);
    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    } else {
      return new UserEntity(
        user._id.toString(),
        user.display_name,
        user.contact_number, // display_name
        user.contact_number_isVerified,
        user.email,
        user.password,
        user.fcm_token,
        user.profile_url,
        user.favourites
      );
    }
  }
}
