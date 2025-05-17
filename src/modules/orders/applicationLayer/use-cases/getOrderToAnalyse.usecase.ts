/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repositoty';
import { ORDER_REPOSITORY } from '../tokens/orderRepository.token';
import { OrderDto } from '../../dtos/Order.dto';

/**
 * injectable service file that get all the recieved orders of a seller
 */
@Injectable()
export class GetOrdersToAnalyse {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
  ) {}

  /**
   * execuable funtion
   */
  async execute(level: number): Promise<OrderDto[]> {
    // console.log('hello');

    /**
     * Get the orders within last 60 minutes
     */
    let orders = await this.OrderRepository.getOrderToAnalyse(level);
    return orders;
  }
}
