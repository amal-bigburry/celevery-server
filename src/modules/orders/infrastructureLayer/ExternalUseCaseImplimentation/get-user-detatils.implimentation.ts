/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This file defines the implementation of the IGetUserDetailUseCase interface.
 * The IGetUserDetailsUsecaseImp class acts as an intermediary between the application and domain layers.
 * It fetches detailed information about a user by interacting with the GetUserDetailUseCase.
 * This service is part of the application layer and bridges the use case logic with the rest of the system.
 * 
 * Dependencies:
 * - GetUserDetailUseCase: Contains the business logic for retrieving user details.
 * - IGetUserDetailUseCase: Interface that defines the contract for getting user details.
 * - UserEntity: Represents the entity/model for user details.
 */
import { Injectable } from '@nestjs/common';
import { IGetUserDetailUseCase } from '../../applicationLayer/interfaces/get-user-details.interface';
import { GetUserDetailUseCase } from 'src/modules/users/applicationLayer/use-cases/get-user-details.usecase';
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';

/**
 * IGetUserDetailsUsecaseImp class implements the IGetUserDetailUseCase interface.
 * It provides an implementation for retrieving user details using GetUserDetailUseCase.
 */
@Injectable()
export class IGetUserDetailsUsecaseImp implements IGetUserDetailUseCase {

  /**
   * Constructor to inject the GetUserDetailUseCase.
   * This use case is responsible for the logic that fetches the user details.
   */
  constructor(private readonly getUserDetailUseCase: GetUserDetailUseCase) {}

  /**
   * Execute method that calls GetUserDetailUseCase to fetch details of a user by user_id.
   * 
   * @param user_id The ID of the user whose details are to be fetched.
   * @returns A promise that resolves to a UserEntity object containing user details.
   */
  async execute(user_id: string): Promise<UserEntity> {
    /**
     * Calls the execute method of GetUserDetailUseCase to retrieve the user details.
     * It returns the UserEntity containing all the necessary details of the user.
     */
    return await this.getUserDetailUseCase.execute(user_id);
  }
}
