/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * import the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../interfaces/order.interface';
import { Order } from '../../domainLayer/entities.ts/order.entity';
import { ORDER_REPOSITORY } from '../../tokens/orderRepository.token';
import { OrderDto } from '../../../../common/dtos/Order.dto';

/**
 * Injectable service file to get the orders that are waiting for the payment to be done
 */
@Injectable()
export class GetAllPaymentWaitingOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
  ) {}

  /**
   * executable function
   */
  async execute(): Promise<Array<OrderDto>> {
    // const order = await this.OrderRepository.findAllPaymentWaitingOrders();
    const order = await this.OrderRepository.findAll();
    return order;
  }
}
