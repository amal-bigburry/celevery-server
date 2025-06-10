/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { OrderInterface } from '../interfaces/order.interface';
/**
 * injectable service file that gets all the placed orders
 */
@Injectable()
export class GetAllOrdersPlacedUseCase {
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
  ) {}
  /**
   * The executable method to retrieve placed orders
   */
  async execute(
    user_id: string,
  ): Promise<object[]> {
    const orders = await this.OrderRepository.findPlacedOrders(
      user_id
    );
    return orders;
  }
}
