/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { USER_REPOSITORY } from '../tokens/userRepository.token';
/**
 * injectable to get the current fcm code of a device
 */
@Injectable()
export class Getcurrentfcmusecase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}
  /**
   * functio to execute
   */
  async execute(userid: string): Promise<string> {
    const fcm = await this.userRepo.getfcm(userid);
    return fcm;
  }
}
