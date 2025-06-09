/**
 * importing the required packages
 * 
 * The necessary modules and services are being imported for this class to function. These imports include the
 * `GetCakeDetailsUseCase` which is used to retrieve cake details based on the cake ID provided, the `IGetCakeDetailsUseCase`
 * interface which defines the structure of the method, and the `CakeEntity` which represents the data structure of the cake entity.
 * The `Injectable` decorator from NestJS is used to mark this service class as injectable for dependency injection.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/get-cake-details.usecase';
import { IGetCakeDetailsUseCase } from '../../applicationLayer/interfaces/get-cake-details.interface';
import { Injectable } from '@nestjs/common';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';

/**
 * This class `IGetCakeDetailsUseCaseImp` implements the interface `IGetCakeDetailsUseCase` and provides the actual
 * implementation of the method to retrieve cake details. The `execute` method takes a `cake_id` as an argument and
 * utilizes the `GetCakeDetailsUseCase` to fetch the cake details associated with the given ID. The response is a promise
 * that resolves to a `CakeEntity`, which holds the details of the cake such as its name, price, description, and other attributes.
 * 
 * The class is decorated with `@Injectable()` from NestJS, allowing it to be injected into other parts of the application
 * for use in services, controllers, or other components that need to interact with the cake details use case.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class IGetCakeDetailsUseCaseImp implements IGetCakeDetailsUseCase {
  constructor(private readonly getCakeDetailsUseCase: GetCakeDetailsUseCase) {}

  /**
   * This method executes the process of retrieving the details of a specific cake from the database or service layer.
   * The method accepts a `cake_id` as an argument, which is passed into the `GetCakeDetailsUseCase` for fetching the
   * relevant cake entity. Once the `execute` method in `GetCakeDetailsUseCase` returns the data, it is returned as a 
   * promise that resolves to an instance of the `CakeEntity` class, containing the details of the requested cake.
   * 
   * @param cake_id The unique identifier of the cake whose details are to be retrieved.
   * @returns Returns a promise that resolves to the details of the cake, represented as a `CakeEntity`.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  execute(cake_id: string): Promise<CakeEntity> {
    return this.getCakeDetailsUseCase.execute(cake_id);
  }
}
