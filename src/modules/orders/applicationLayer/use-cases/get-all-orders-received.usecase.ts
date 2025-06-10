/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { OrderInterface } from '../interfaces/order.interface';
/**
 * Injectable service file that gets all the received orders of a seller
 */
@Injectable()
export class GetAllOrdersReceivedUseCase {
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
  ) {}
  /**
   * Executable function
   */
  async execute(
    userId: string,
    store_id:string,
  ): Promise<object[]> {
    const orders = await this.OrderRepository.findReceivedOrders(
      userId,
      store_id,
    );
    return orders;
  }
}
