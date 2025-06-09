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
import { OrderRepository } from '../interfaces/order.interface';
import { ChangeOrderStatusDto } from '../../../../common/dtos/changeOrderStatus.dto';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { ORDER_REPOSITORY } from '../../tokens/orderRepository.token';
import { IGetCakeDetailsUseCase } from '../interfaces/get-cake-details.interface';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { GET_CAKE_DETAILS } from '../../tokens/get_cake_details.token';

/**
 * Injectable service file that handles the order status change
 */
@Injectable()
export class ChangeOrderStatusUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
    // @Inject(GET_CAKE_DETAILS)
    // private readonly getCakeDetailsUseCase: IGetCakeDetailsUseCase,
  ) {}

  async execute(changeOrderStatusDto: ChangeOrderStatusDto): Promise<OrderDto> {
    const order = await this.OrderRepository.findById(changeOrderStatusDto._id);
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

    let updated_order: OrderDto;

    if (changeOrderStatusDto.new_status === ORDER_STATUS.CANCELLED) {
      updated_order =
        await this.OrderRepository.changeStatusToCancel(changeOrderStatusDto);
    } else {
      updated_order = await this.OrderRepository.changeStatus(
        changeOrderStatusDto._id,
        changeOrderStatusDto.new_status,
      );
    }

    return updated_order;
  }
}
