/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Import the required packages
 */
import { Order } from '../../domainLayer/entities.ts/order.entity';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

/**
 * Interface to manage orders in the system
 */
export interface OrderRepository {
  
  /**
   * Retrieves all orders
   * @returns A promise containing a list of OrderDto objects
   */
  findAll(): Promise<OrderDto[]>;

  /**
   * Retrieves the placed orders of a user with pagination
   * @param user_id - The ID of the user
   * @param page - The current page number
   * @param limit - The maximum number of orders to retrieve per page
   * @returns A promise containing a PaginationDto with order data
   */
  findPlacedOrders(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto>;

  /**
   * Retrieves the received orders for a user with pagination
   * @param user_id - The ID of the user
   * @param page - The current page number
   * @param limit - The maximum number of orders to retrieve per page
   * @returns A promise containing a PaginationDto with order data
   */
  findReceivedOrders(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto>;

  /**
   * Creates a new order
   * @param order - The OrderDto object containing order details
   * @returns A promise containing the created order
   */
  create(order: OrderDto): Promise<Object>;

  /**
   * Retrieves an order by its ID
   * @param order_id - The ID of the order to retrieve
   * @returns A promise containing the OrderDto object
   */
  findById(order_id: string): Promise<OrderDto>;

  /**
   * Changes the status of an order
   * @param order_id - The ID of the order to update
   * @param new_status - The new status to set for the order
   * @returns A promise containing the updated OrderDto object
   */
  changeStatus(order_id: string, new_status: string): Promise<OrderDto>;

  /**
   * Retrieves all orders with a "payment waiting" status
   * @returns A promise containing a list of OrderDto objects
   */
  findAllPaymentWaitingOrders(): Promise<OrderDto[]>;

  /**
   * Retrieves orders that need to be analyzed based on the level
   * @param level - The analysis level (1, 2, etc.)
   * @returns A promise containing a list of OrderDto objects
   */
  getOrderToAnalyse(level: number): Promise<OrderDto[]>;
}
