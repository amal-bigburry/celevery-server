/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repositoty';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDER_REPOSITORY } from '../tokens/orderRepository.token';
/**
 * injectable service file that get all the recieved orders of a seller
 */
@Injectable()
export class GetAllOrdersReceivedUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
  ) {}
  /**
   * execuable funtion
   */
  async execute(
    userId: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto> {
    let orders = await this.OrderRepository.findReceivedOrders(
      userId,
      page,
      limit,
    );
    return orders;
  }
}
