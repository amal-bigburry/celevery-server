/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * importing required packages
 */
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderRepository } from '../interfaces/order.repositoty';
import { ChangeOrderStatusDto } from '../../../../common/dtos/changeOrderStatus.dto';
import {ORDER_STATUS} from 'src/common/utils/contants';
import { ORDER_REPOSITORY } from '../../tokens/orderRepository.token';
import { INotificationUseCase } from '../interfaces/NotificationUsecase.interface';
import { IGetCakeDetailsUseCase } from '../interfaces/GetCakeDetailsusecase.interface';
import { IGetStoreUsecase } from '../interfaces/GetStoreusecase.interface';
import { IGetUserDetailUseCase } from '../interfaces/GetuserDetailsUsecase.interface';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { GET_CAKE_DETAILS } from '../../tokens/get_cake_details.token';
import { NOTIFICATION_USECASE } from '../../tokens/notificationusecase.token';
import { GET_USER_DETAILS } from '../../tokens/get_user_details.token';
import { GET_STORE_DETAILS } from '../../tokens/get_store_details.token';

/**
 * Injectable service file that handles the order status change
 */
@Injectable()
export class ChangeOrderStatusUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
    @Inject(NOTIFICATION_USECASE)
    private readonly notificationUseCase: INotificationUseCase,
    @Inject(GET_USER_DETAILS)
    private readonly getuserDetailsUseCase: IGetUserDetailUseCase,
    @Inject(GET_CAKE_DETAILS)
    private readonly getCakeDetailsUseCase: IGetCakeDetailsUseCase,
    @Inject(GET_STORE_DETAILS)
    private readonly getStoreUsecase: IGetStoreUsecase,
  ) {}

  async execute(
    changeOrderStatusDto: ChangeOrderStatusDto,
  ): Promise<OrderDto> {
    // 1. Validate order
    const order = await this.OrderRepository.findById(changeOrderStatusDto.order_id);
    if (!order) {
      throw new UnauthorizedException('Order not found');
    }
    if (order.order_status === ORDER_STATUS.CANCELLED) {
      throw new BadRequestException('Its a Cancelled Order');
    }

    // 2. Authorization check: Does this seller own the cake?
    const thiscake = await this.getCakeDetailsUseCase.execute(order.cake_id);
    const seller_id = (await this.getStoreUsecase.execute(thiscake.store_id)).store_owner_id;
    if (seller_id !== changeOrderStatusDto.user_id) {
      throw new BadRequestException(
        'This order does not belong to you, so you are not permitted to change the status.',
      );
    }

    // 3. Change order status
    const updated_order = await this.OrderRepository.changeStatus(
      changeOrderStatusDto.order_id,
      changeOrderStatusDto.new_status,
    );

    // 4. Notify both buyer and seller (optional code block commented for now)
    // Note: If you want to enable notifications, uncomment this block and refine messages.

    // const seller = await this.getuserDetailsUseCase.execute(seller_id);
    // const buyer = await this.getuserDetailsUseCase.execute(order.buyer_id);
    // const cake = await this.getCakeDetailsUseCase.execute(order.cake_id);
    // if (!seller || !buyer || !cake) throw new UnauthorizedException('Entity not found');

    // Add notification logic here...

    // 5. Return updated order
    return updated_order;
  }
}
