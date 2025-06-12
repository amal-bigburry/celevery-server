/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Importing required packages
 */
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ChangeOrderStatusDto } from '../../../../common/dtos/changeOrderStatus.dto';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { OrderInterface } from '../interfaces/order.interface';
import { orderQueue } from 'src/common/utils/order.queque';
import { ChangeOrderStatusInterface } from 'src/common/interfaces/change-order-status.interface';
/**
 * Injectable service file that handles the order status change
 */
@Injectable()
export class ChangeOrderStatusUseCase implements ChangeOrderStatusInterface{
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
  ) {}
  async execute(changeOrderStatusDto: ChangeOrderStatusDto): Promise<OrderDto> {
    const order = await this.OrderRepository.findById(changeOrderStatusDto.order_id);
    if (!order) {
      throw new UnauthorizedException('Order not found');
    }
    if (order.order_status === ORDER_STATUS.CANCELLED) {
      throw new BadRequestException('It’s a Cancelled Order');
    }
    // const thiscake = await this.getCakeDetailsUseCase.execute(order.cake_id);
    if (
      order.seller_id !== changeOrderStatusDto.user_id &&
      order.buyer_id !== changeOrderStatusDto.user_id
    ) {
      throw new BadRequestException(
        'This order does not belong to you. Only the buyer or seller can change the status.',
      );
    }
    if (
      order.buyer_id === changeOrderStatusDto.user_id &&
      order.order_status == ORDER_STATUS.REQUESTED &&
      changeOrderStatusDto.new_status == ORDER_STATUS.WAITING_TO_PAY
    ) {
      throw new UnauthorizedException(
        'buyers are not allowed to confirm the order.',
      );
    }
    const jobId = `cancel-order-${order.id}`; // Match the jobId used when adding
    try {
      const job = await orderQueue.getJob(jobId);
      if (job) {
        await job.remove(); // Remove the job from the queue
        console.log(`Cancelled job for order ${order.id}`);
      } else {
        console.log(`No job found for order ${order.id}`);
      }
    } catch (error) {
      console.error(`Error cancelling job for order ${order.id}:`, error);
    }
    let updated_order: OrderDto;
    if (changeOrderStatusDto.new_status === ORDER_STATUS.CANCELLED) {
      updated_order =
        await this.OrderRepository.changeStatusToCancel(changeOrderStatusDto);
    } else {
      updated_order = await this.OrderRepository.changeStatus(
        changeOrderStatusDto.order_id,
        changeOrderStatusDto.new_status,
      );
    }
    return updated_order;
  }
}
