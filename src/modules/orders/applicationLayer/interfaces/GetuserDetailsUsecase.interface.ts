/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { UserEntity } from "src/modules/users/domainLayer/entities.ts/user.entity";

/**
 * Interface for the use case of getting user details by user ID
 */
export interface IGetUserDetailUseCase {
  
  /**
   * Executes the retrieval of user details by user ID
   * @param userid - The unique identifier for the user
   * @returns Promise of UserEntity containing the user details
   */
  execute(userid: string): Promise<UserEntity>;
}
