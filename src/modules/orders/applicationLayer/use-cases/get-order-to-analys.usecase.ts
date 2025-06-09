/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { OrderInterface } from '../interfaces/order.interface';
/**
 * injectable service file that get all the recieved orders of a seller
 */
@Injectable()
export class GetOrdersToAnalyse {
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
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
