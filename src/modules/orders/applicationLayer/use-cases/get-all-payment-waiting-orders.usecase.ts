/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * import the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { OrderInterface } from '../interfaces/order.interface';
import { GetAllPaymentWaitingOrdersInterface } from 'src/common/interfaces/get-orders-waiting-to-pay.interface';
/**
 * Injectable service file to get the orders that are waiting for the payment to be done
 */
@Injectable()
export class GetAllPaymentWaitingOrdersUseCase implements GetAllPaymentWaitingOrdersInterface {
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
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
