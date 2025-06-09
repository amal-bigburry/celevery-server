/**
 * @fileoverview Interface definition for order retrieval use case in Bigburry Hypersystems LLP
 * @description
 * This file establishes the contract for the service responsible for retrieving
 * orders based on a specific analysis level. The interface ensures that any
 * implementation will provide a consistent method to fetch order data for analysis
 * purposes, encapsulated in Data Transfer Objects (DTOs).
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * Importing the OrderDto data transfer object
 * This DTO represents the structure of order data used for analysis,
 * enabling decoupling of domain entities from external data representation.
 */
import { OrderDto } from 'src/common/dtos/Order.dto';

/**
 * Interface defining the contract for retrieving orders to analyze
 * This interface mandates an asynchronous method that filters and returns
 * orders based on a specified analysis level, facilitating modularity
 * and consistent implementation across different data sources.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
export interface IGetOrdersToAnalyse {
  /**
   * Retrieves an array of OrderDto objects filtered by the given analysis level
   * @param level - A numeric value indicating the analysis level filter criteria
   * @returns A Promise resolving to an array of OrderDto instances matching the level
   * 
   * This method abstracts the logic required to fetch orders appropriate for
   * various analytical scenarios, supporting scalability and maintainability.
   */
  execute(level: number): Promise<OrderDto[]>;
}
