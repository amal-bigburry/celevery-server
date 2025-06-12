/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { OrderDto } from "../dtos/Order.dto";
/**
 * Interface for retrieving orders associated with a specific cake ID
 */
export interface GetOrdersWithCakeIdInterface {
  /**
   * Executes the retrieval of orders by cake ID
   * @param cake_id - The unique identifier for the cake
   * @returns Promise of an array of OrderDto objects containing the orders associated with the cake
   */
  execute(cake_id: string): Promise<OrderDto[]>;
}
