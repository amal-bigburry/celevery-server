/**
 * import the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repositoty';
import { Order } from '../../domainLayer/entities.ts/order.entity';
import { ORDER_REPOSITORY } from '../tokens/orderRepository.token';
import { OrderDto } from '../../dtos/Order.dto';
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
    let order = await this.OrderRepository.findAllPaymentWaitingOrders();
    return order;
  }
}
