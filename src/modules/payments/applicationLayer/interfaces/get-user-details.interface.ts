/**
 * Importing the UserEntity to work with the user data structure.
 * The `UserEntity` represents the domain entity for users within the application.
 * It encapsulates the core business logic and properties related to a user in the system.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';
/**
 * Interface for the use case responsible for fetching the details of a specific user.
 * The `IGetUserDetailUseCase` defines the contract that must be implemented to retrieve user details.
 * The `execute` method, when implemented, will accept a `userid` (string) and return a `Promise` that resolves to a `UserEntity`,
 * which contains all the details associated with the specified user.
 * 
 * This interface serves as an abstraction, ensuring consistent implementation and enabling easy modifications in the future.
 * It provides a clean separation of concerns, ensuring that the logic for fetching user details is encapsulated and testable.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export interface IGetUserDetailUseCase {
  execute(userid: string): Promise<UserEntity>;  // Method to retrieve user details based on the provided user ID
}
