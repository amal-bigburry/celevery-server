/**
 * Importing required packages
 * Importing OrderDto for use in the order repository interface
 */
/**
 * Interface of cakerepository
 * Defines a contract for an order repository to retrieve all orders
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
export interface IOrderRepository {
  /**
   * Retrieves all orders from the repository
   * @returns Promise resolving to an array of OrderDto objects
   */
  findAll(): Promise<OrderDto[]>;
}
