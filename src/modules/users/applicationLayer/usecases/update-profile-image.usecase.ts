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
import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { USERINTERFACETOKEN } from '../../tokens/user.token';
/**
 * ******************************************************************************************************
 * UpdatefcmUseCase Class
 *
 * Manages the update process of the FCM token for a user within the Bigburry Hypersystems LLP system, ensuring
 * push notification tokens are current and valid.
 * ******************************************************************************************************
 */
@Injectable()
export class UpdateProfileImageUseCase {
  constructor(
    @Inject(USERINTERFACETOKEN) private readonly userRepo: UserInterface,
  ) {}
  /**
   * **************************************************************************************************
   * execute Method
   *
   * Accepts a user ID and a TokenDto representing the new FCM token, updates the repository with this token,
   * and returns a string indicating the outcome of the update operation.
   * **************************************************************************************************
   */
  async execute(userid: string, file): Promise<string> {
    const user = await this.userRepo.updateProfileImage(userid, file);
    return user;
  }
}
