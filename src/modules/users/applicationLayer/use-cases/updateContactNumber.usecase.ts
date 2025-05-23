/**
 * ******************************************************************************************************
 * UpdatefcmUseCase.ts
 * 
 * This injectable class by Bigburry Hypersystems LLP handles the use case for updating the Firebase Cloud Messaging 
 * (FCM) token associated with a user. It uses dependency injection to interact with the UserRepository, 
 * maintaining separation of concerns between business logic and data access.
 * 
 * The execute method takes a user ID and a TokenDto, calls the repository to update the stored FCM token, and 
 * returns a status string indicating the result of the operation.
 * ******************************************************************************************************
 */

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { TokenDto } from '../../UserDtos/token.dto';
import { USER_REPOSITORY } from '../tokens/userRepository.token';

/**
 * ******************************************************************************************************
 * UpdatefcmUseCase Class
 * 
 * Manages the update process of the FCM token for a user within the Bigburry Hypersystems LLP system, ensuring 
 * push notification tokens are current and valid.
 * ******************************************************************************************************
 */
@Injectable()
export class UpdateContactNumberUsecase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   * 
   * Accepts a user ID and a TokenDto representing the new FCM token, updates the repository with this token, 
   * and returns a string indicating the outcome of the update operation.
   * **************************************************************************************************
   */
  async execute(userid: string, contact_number: string): Promise<string> {
    let existing = await this.userRepo.findByNumber(contact_number)
    if(existing){
      throw new BadRequestException('User Already exist with this number')
    }
    const user = await this.userRepo.updateContactNumber(userid, contact_number);
    return user;
  }
}
