/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../tokens/userRepository.token';
import { UserRepository } from '../interfaces/user.interface';
/**
 * Usecase to handle removing a cake from user's favourites
 */
@Injectable()
export class RemoveMyFavouritesUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly UserRepository: UserRepository,
  ) {}
  /**
   * Removes a cake from the user's favourites list.
   * @param user_id - The ID of the user
   * @param cake_id - The ID of the cake to remove from favourites
   * @returns A string indicating the success status
   */
  async execute(user_id: string, cake_id: string): Promise<string> {
    return await this.UserRepository.removeFavourite(user_id, cake_id);
  }
}
