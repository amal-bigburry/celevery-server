/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../tokens/userRepository.token';
import { UserRepository } from '../interfaces/user.interface';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
/**
 * Service use case to fetch user's favourite cakes
 */
@Injectable()
export class GetMyFavouritesUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}
  /**
   * Executes the use case to retrieve all favourite cakes for the specified user.
   * @param userId - The ID of the user whose favourites are to be fetched
   * @returns Promise resolving to an array of CakeEntity objects
   */
  async execute(userId: string): Promise<CakeEntity[]> {
    return await this.userRepository.getFavourite(userId);
  }
}
