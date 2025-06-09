/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { CakeEntity } from "src/modules/cakes/domainLayer/entities/cake.entity";

/**
 * Interface for the use case of getting cake details by its ID
 */
export interface IGetCakeDetailsUseCase {
  
  /**
   * Executes the retrieval of cake details by cake ID
   * @param cake_id - The unique identifier for the cake
   * @returns Promise of CakeEntity containing the cake details
   */
  execute(cake_id: string): Promise<CakeEntity>;
}
