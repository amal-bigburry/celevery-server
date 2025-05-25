/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * user repository interface
 */
export interface UserRepository {
  /**
   * Method to find a user by their ID
   * @returns a promise with an empty array as a placeholder for the result
   */
  finduserById(): Promise<[]>;
}
