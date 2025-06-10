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
import { UserInterface } from '../interfaces/user.interface';
import { USERINTERFACETOKEN } from '../../tokens/user.token';
@Injectable()
export class Getcurrentfcmusecase {
  constructor(
    @Inject(USERINTERFACETOKEN) private readonly userRepo: UserInterface,
  ) {}
  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts a user ID string, then asynchronously calls the repository to retrieve the corresponding FCM token.
   * Returns a Promise that resolves to the token string, enabling further processing or notification delivery.
   * **************************************************************************************************
   */
  async execute(userId: string): Promise<string> {
    const fcm = await this.userRepo.getfcm(userId);
    return fcm;
  }
}
