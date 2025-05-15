/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repositoty';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDER_REPOSITORY } from '../tokens/orderRepository.token';
/**
 * injectable service file that get all the placed orders
 */
@Injectable()
export class GetAllOrdersPlacedUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
  ) {}
  /**
   * The executable file
   */
  async execute(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto> {
    let orders = await this.OrderRepository.findPlacedOrders(
      user_id,
      page,
      limit,
    );
    return orders;
  }
}
