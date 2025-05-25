/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../interfaces/order.repositoty';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDER_REPOSITORY } from '../../tokens/orderRepository.token';

/**
 * Injectable service file that gets all the received orders of a seller
 */
@Injectable()
export class GetAllOrdersReceivedUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
  ) {}

  /**
   * Executable function
   */
  async execute(
    userId: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto> {
    const orders = await this.OrderRepository.findReceivedOrders(
      userId,
      page,
      limit,
    );
    return orders;
  }
}
