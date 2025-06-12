/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Interface for updating the 'known_for' field of a cake
 */
export interface UpdateSessionidUseCaseInterface {
  /**
   * Executes the update of the 'known_for' field for a specific cake
   * @param cake_id - The ID of the cake to update
   * @param known_for - The new value for the 'known_for' field
   * @returns Promise indicating the result of the update operation
   */
  execute(order_id:string, session_id:string): Promise<string>;
}
