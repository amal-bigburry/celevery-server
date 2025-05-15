/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repositoty';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDER_REPOSITORY } from '../tokens/orderRepository.token';
import { OrderDto } from '../../dtos/Order.dto';
/**
 * injectable service file that get all the recieved orders of a seller
 */
@Injectable()
export class GetOrderDetailsUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
  ) {}
  /**
   * execuable funtion
   */
  async execute(order_id:string): Promise<OrderDto> {
    let order = await this.OrderRepository.findById(order_id);
    return order;
  }
}
