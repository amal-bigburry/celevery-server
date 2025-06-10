/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { USERINTERFACETOKEN } from '../../tokens/user.token';
/**
 * Service to handle adding a cake to user's favourites
 */
@Injectable()
export class AddToFavouritesUsecase {
  constructor(
    @Inject(USERINTERFACETOKEN)
    private readonly userRepository: UserInterface,
  ) {}
  /**
   * Adds a cake to the user's favourites list
   * @param user_id - ID of the user
   * @param cake_id - ID of the cake to add to favourites
   * @returns Promise<string> indicating success status
   */
  async execute(user_id: string, cake_id: string): Promise<string> {
    return this.userRepository.addFavourite(user_id, cake_id);
  }
}
