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
 * Service to handle sending notifications
 */
@Injectable()
export class RemoveMyFavouritesUsecase
 {

  constructor(
      @Inject(USER_REPOSITORY)
      private readonly UserRepository: UserRepository) {}

  /**
   * Method to send a notification
   * @param notificationDto - DTO containing the notification data
   * @returns a string indicating the success status
   * @throws UnauthorizedException if there is an error sending the notification
   */
  async execute(user_id:string, cake_id:string): Promise<string> {
    return await this.UserRepository.removeFavourite(user_id, cake_id)
  }

  }