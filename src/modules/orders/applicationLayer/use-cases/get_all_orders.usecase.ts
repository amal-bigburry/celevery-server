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
import { GetAllOrdersInterface } from 'src/common/interfaces/get-all-orders.interface';
/**
 * Injectable service file that gets all the received orders of a seller
 */
@Injectable()
export class GetAllOrdersUseCase implements GetAllOrdersInterface{
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
  ) {}
  /**
   * Executable function
   */
  async execute(): Promise<OrderDto[]> {
    const orders = await this.OrderRepository.findAll();
    return orders;
  }
}
