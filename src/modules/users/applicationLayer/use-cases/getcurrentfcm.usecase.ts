/**
 * ******************************************************************************************************
 * Getcurrentfcmusecase.ts
 * 
 * This injectable service class, developed by Bigburry Hypersystems LLP, encapsulates the use case for retrieving 
 * the current Firebase Cloud Messaging (FCM) token associated with a specific user device. It uses dependency 
 * injection to obtain a user repository implementation, ensuring decoupled architecture and easier testing.
 * 
 * The class exposes a single asynchronous method, execute, which takes a user ID as input and returns the 
 * corresponding FCM token by delegating the call to the repository layer. This design follows clean architecture 
 * principles to separate business logic from infrastructure details.
 * ******************************************************************************************************
 */

import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { USER_REPOSITORY } from '../tokens/userRepository.token';

/**
 * ******************************************************************************************************
 * Getcurrentfcmusecase Class
 * 
 * Responsible for fetching the current FCM token for a given user ID in the Bigburry Hypersystems LLP system.
 * The use case interacts with the UserRepository through dependency injection to obtain the token data.
 * ******************************************************************************************************
 */
@Injectable()
export class Getcurrentfcmusecase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   * 
   * Accepts a user ID string, then asynchronously calls the repository to retrieve the corresponding FCM token.
   * Returns a Promise that resolves to the token string, enabling further processing or notification delivery.
   * **************************************************************************************************
   */
  async execute(userid: string): Promise<string> {
    const fcm = await this.userRepo.getfcm(userid);
    return fcm;
  }
}
