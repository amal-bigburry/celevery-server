/**
 * ******************************************************************************************************
 * RegisterUseCase.ts
 * 
 * This injectable class by Bigburry Hypersystems LLP encapsulates the user registration use case. It uses 
 * dependency injection to interact with the UserRepository for creating new user records in the system.
 * 
 * The execute method accepts a RegisterDto containing user registration details, calls the repository to 
 * create the user, and returns an object wrapping the created user data. If creation fails, it returns an 
 * empty object.
 * ******************************************************************************************************
 */

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repositoty';
import { RegisterDto } from '../../UserDtos/Register.dto';
import { USER_REPOSITORY } from '../tokens/userRepository.token';

/**
 * ******************************************************************************************************
 * RegisterUseCase Class
 * 
 * Manages the user registration process at Bigburry Hypersystems LLP by delegating user creation tasks to 
 * the repository layer, ensuring clean separation of concerns.
 * ******************************************************************************************************
 */
@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  /**
   * **************************************************************************************************
   * execute Method
   * 
   * Accepts registration data encapsulated in RegisterDto, calls the repository to create a new user, and 
   * returns the created user wrapped in an object. Provides fallback to an empty object if user creation fails.
   * **************************************************************************************************
   */
  async execute(RegisterDto: RegisterDto): Promise<{ user: object }> {
    if(RegisterDto.password.length < 8)
    {
      throw new BadRequestException("Password must be minimum 8 charecters")
    }
    const user = await this.userRepo.createUser(RegisterDto);
    return { user: user ? user : {} };
  }
}
