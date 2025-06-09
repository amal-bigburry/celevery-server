/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../interfaces/order.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDER_REPOSITORY } from '../../tokens/orderRepository.token';

/**
 * injectable service file that gets all the placed orders
 */
@Injectable()
export class GetAllOrdersPlacedUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
  ) {}

  /**
   * The executable method to retrieve placed orders
   */
  async execute(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto> {
    const orders = await this.OrderRepository.findPlacedOrders(
      user_id,
      page,
      limit,
    );
    return orders;
  }
}
