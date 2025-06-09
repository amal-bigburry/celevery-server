/**
 * importing required packages
 * 
 * This section imports the necessary modules required for the implementation of the user detail retrieval functionality.
 * The `GetUserDetailUseCase` is used to retrieve user information from a data source, while the `UserEntity` represents 
 * the structure of the user data. The `IGetUserDetailUseCase` interface defines the structure of the service used for 
 * fetching user details, and the `Injectable` decorator from NestJS is applied to make this service available for dependency injection.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { GetUserDetailUseCase } from 'src/modules/users/applicationLayer/use-cases/get-user-details.usecase';
import { IGetUserDetailUseCase } from '../../applicationLayer/interfaces/get-user-details.interface';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domainLayer/entities/user.entity';

/**
 * This class, `IGetUserDetailsUsecaseImp`, provides the concrete implementation for retrieving user details.
 * It implements the `IGetUserDetailUseCase` interface, which ensures the service adheres to the defined contract for
 * fetching user details. The `execute` method of this class takes a `user_id` as an input and uses the `GetUserDetailUseCase`
 * to retrieve the associated user entity.
 * 
 * The `Injectable` decorator allows the class to be injected into other parts of the NestJS application, making it accessible
 * for use in services, controllers, or any other component that requires user information.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class IGetUserDetailsUsecaseImp implements IGetUserDetailUseCase {
  constructor(private readonly getUserDetailUseCase: GetUserDetailUseCase) {}

  /**
   * This method executes the logic of retrieving a user's details. It takes a `user_id` as an argument and delegates the task
   * to the `GetUserDetailUseCase`, which interacts with the database or data layer to fetch the relevant user entity.
   * 
   * The method returns a promise that resolves to a `UserEntity`, which contains the user's data such as their name, email,
   * address, and other relevant details.
   * 
   * @param user_id The unique identifier for the user whose details need to be fetched.
   * @returns Returns a promise that resolves to the details of the user, encapsulated in a `UserEntity`.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  execute(user_id: string): Promise<UserEntity> {
    return this.getUserDetailUseCase.execute(user_id);
  }
}
