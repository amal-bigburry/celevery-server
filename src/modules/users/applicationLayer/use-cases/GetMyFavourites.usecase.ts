/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../tokens/userRepository.token';
import { UserRepository } from '../repositories/user.repositoty';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';

/**
 * Service to handle sending notifications
 */
@Injectable()
export class GetMyFavouritesUsecase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly UserRepository: UserRepository,
  ) {}

  /**
   * Method to send a notification
   * @param notificationDto - DTO containing the notification data
   * @returns a string indicating the success status
   * @throws UnauthorizedException if there is an error sending the notification
   */
  async execute(user_id: string): Promise<Array<CakeEntity>> {
    return await this.UserRepository.getFavourite(user_id);
  }
}
