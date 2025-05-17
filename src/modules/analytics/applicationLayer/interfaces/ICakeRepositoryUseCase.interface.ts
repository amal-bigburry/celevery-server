/**
 * Importing required packages
 * Importing CakeEntity to use in the repository interface
 */
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
/**
 * Interface of cakerepository
 * Defines the contract for a cake repository with a method to fetch a cake by ID
 */
export interface ICakeRepositoryUseCase {
  /**
   * Executes the retrieval of a CakeEntity by its ID
   * @param cake_id - The unique identifier of the cake
   * @returns Promise resolving to a CakeEntity object
   */
  execute(cake_id: string): Promise<CakeEntity>;
}
