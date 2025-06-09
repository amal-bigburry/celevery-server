/**
 * @fileoverview Interface definition for OrderRepository in Bigburry Hypersystems LLP
 * @description
 * This file declares the contract that any order repository implementation must
 * follow to provide data access for orders. It focuses on the retrieval of all
 * orders and uses OrderDto as the data structure to ensure consistency in data
 * representation across different layers of the application.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * Importing OrderDto to define the data shape used in repository methods
 * OrderDto serves as a Data Transfer Object encapsulating order-related information,
 * enabling abstraction from internal entity representations.
 */
import { OrderDto } from 'src/common/dtos/Order.dto';

/**
 * Interface defining the contract for the Order Repository
 * This interface ensures any implementing class provides a method to fetch
 * all order records asynchronously, supporting data retrieval operations
 * necessary for business logic and presentation layers.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
export interface IOrderRepository {
  /**
   * Asynchronously fetches all orders present in the repository
   * @returns A Promise resolving to an array of OrderDto objects representing all orders
   * 
   * This method abstracts the data source details, allowing flexible implementations
   * (e.g., database, in-memory, API) while providing a consistent interface.
   */
  findAll(): Promise<OrderDto[]>;
}
