/**
 * Importing required packages
 * Importing OrderDto to be used in the orders retrieval interface
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * Interface of cakerepository
 * Defines a contract for fetching orders to analyze based on a given level
 */
export interface IGetOrdersToAnalyse {
  /**
   * Executes the retrieval of an array of orders filtered by analysis level
   * @param level - The analysis level to filter orders
   * @returns Promise resolving to an array of OrderDto objects
   */
  execute(level: number): Promise<OrderDto[]>;
}
