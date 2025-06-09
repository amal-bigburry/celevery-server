/**
 * Importing the required packages for the use case.
 * The `CakeEntity` represents the domain entity for cakes in the system.
 * This entity will be used to manage the data structure and business logic related to cakes.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';

/**
 * Interface for the use case responsible for fetching the details of a specific cake.
 * The `IGetCakeDetailsUseCase` defines a contract for any class that implements the logic for retrieving the details
 * of a cake based on its unique identifier (`cake_id`).
 * The `execute` method is expected to be implemented by a class to retrieve the cake details asynchronously.
 * It takes a `cake_id` (string) as input and returns a `Promise` that resolves to a `CakeEntity` object,
 * which contains all the details of the specified cake.
 * 
 * This interface serves as an abstraction, ensuring that any implementation of this use case follows the
 * same structure and allows for easy testing and modification of the underlying implementation.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export interface IGetCakeDetailsUseCase {
  execute(cake_id: string): Promise<CakeEntity>;  // Method to retrieve cake details based on the provided cake ID
}
