/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * importing the required packages
 */
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { OrderRepository } from '../interfaces/order.repositoty';
import { ORDER_REPOSITORY } from '../../tokens/orderRepository.token';
import { INotificationUseCase } from '../interfaces/NotificationUsecase.interface';
import { IGetStoreUsecase } from '../interfaces/GetStoreusecase.interface';
import { IGetUserDetailUseCase } from '../interfaces/GetuserDetailsUsecase.interface';
import { IGetCakeDetailsUseCase } from '../interfaces/GetCakeDetailsusecase.interface';
import { IMqttService } from '../interfaces/MqttService.interface';
import { NOTIFICATION_USECASE } from '../../tokens/notificationusecase.token';
import { GET_STORE_DETAILS } from '../../tokens/get_store_details.token';
import { GET_USER_DETAILS } from '../../tokens/get_user_details.token';
import { GET_CAKE_DETAILS } from '../../tokens/get_cake_details.token';
import { MQTTTOKEN } from '../../tokens/mqtt.token';
import { GET_ORDERS_OFCAKE } from '../../tokens/get_orders_with_cakeid.token';
import { GetOrdersWithCakeId } from '../interfaces/GetOrdersWithCakeId.interface';
import { UPDATE_KNOWN_FOR_IN_CAKE } from '../../tokens/update_known_for_in_cake.token';
import { UpdateKnownForOfCakeUseCase } from '../interfaces/UpdateKnownForOfCakeUseCase.interface';
import { STORE_STATUS } from 'src/common/utils/contants';
import { PopDto } from 'src/common/dtos/pop.dto';
import mongoose from 'mongoose';
import { getCurrentDayName } from 'src/common/utils/getCurrentDayName';
import { isStoreOpen } from 'src/common/utils/isStoreOpen';

/**
 * injectable service file that makes an order request
 */
@Injectable()
export class RequestOrderUseCase {
  private orders: OrderDto[] = [];
  private knownfor_occurences = {};
  private occurenceInArray: any;

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,

    @Inject(NOTIFICATION_USECASE)
    private readonly notificationUseCase: INotificationUseCase,

    @Inject(GET_STORE_DETAILS)
    private readonly getstoreUsecase: IGetStoreUsecase,

    @Inject(GET_USER_DETAILS)
    private readonly getuserDetailsUseCase: IGetUserDetailUseCase,

    @Inject(GET_CAKE_DETAILS)
    private readonly getCakeDetailsUseCase: IGetCakeDetailsUseCase,

    @Inject(GET_ORDERS_OFCAKE)
    private readonly getOrdersWithCakeId: GetOrdersWithCakeId,

    @Inject(UPDATE_KNOWN_FOR_IN_CAKE)
    private readonly updateKnownForOfCake: UpdateKnownForOfCakeUseCase,

    @Inject(MQTTTOKEN)
    private readonly mqttService: IMqttService,
  ) {}

  /**
   * executable file
   */
  async execute(orderDto: OrderDto): Promise<{ order: Object }> {
    // get the cake details from the cakeid
    let cake = await this.getCakeDetailsUseCase.execute(orderDto.cake_id);
    // Validate if the cake exists
    if (!cake) throw new UnauthorizedException('Cake not found');
    // get the store details from the order
    let store = await this.getstoreUsecase.execute(cake.store_id);
    orderDto.seller_id = store.store_owner_id;
    // confirms that the store is open
    if (store.store_status != STORE_STATUS.APPROVED) {
    }
    const currentDay = getCurrentDayName().toLowerCase(); // e.g., "monday"
    const openAt = store[`${currentDay}_open_at`];
    const closeAt = store[`${currentDay}_close_at`];
    if (!isStoreOpen(openAt, closeAt)) {
      throw new BadRequestException('The store is not open');
    }
    // Validate if the cake variant exists
    if (
      !cake.cake_variants.some(
        (variant) => variant._id === orderDto.cake_variant_id,
      )
    ) {
      throw new BadRequestException('Cake variant not found');
    }
    let buyer = await this.getuserDetailsUseCase.execute(orderDto.buyer_id);
    if (!buyer) throw new UnauthorizedException('buyer not found');

    let seller = await this.getuserDetailsUseCase.execute(orderDto.seller_id);
    if (!seller) throw new UnauthorizedException('seller not found');

    orderDto.payment_tracking_id = '';
    let order = await this.OrderRepository.create(orderDto);

    let AllordersWithTheCurrentCake = await this.getOrdersWithCakeId.execute(
      orderDto.cake_id,
    );

    let variant = cake.cake_variants.find(
      (v) => v._id === orderDto.cake_variant_id,
    );

    let data: PopDto = {
      topic: store.store_owner_id,
      message: `New order received from ${buyer.email} for ${cake.cake_name} of variant with weight of ${variant?.weight} kg, price of ${variant?.cake_price} and quantity of ${orderDto.quantity}. Customer Needs it before ${orderDto.need_before}`,
    };
    await this.notificationUseCase.execute({
      title: 'Order Status Changed',
      message: `New order received from ${buyer.email} for ${cake.cake_name} of variant with weight of ${variant?.weight} kg, price of ${variant?.cake_price} and quantity of ${orderDto.quantity}. Customer Needs it before ${orderDto.need_before}`,
      token: buyer.fcm_token, // Assuming buyer_token is available in the order object
    });
    // Notify buyer about the order status change
    await this.notificationUseCase.execute({
      title: 'Order Status Changed',
      message: `New order received from ${buyer.email} for ${cake.cake_name} of variant with weight of ${variant?.weight} kg, price of ${variant?.cake_price} and quantity of ${orderDto.quantity}. Customer Needs it before ${orderDto.need_before}`,
      token: seller.fcm_token, // Assuming buyer_token is available in the order object
    });
    await this.mqttService.publish(data);

    this.knownfor_occurences = [];
    AllordersWithTheCurrentCake.forEach((order) => {
      this.knownfor_occurences[order.known_for] =
        (this.knownfor_occurences[order.known_for] || 0) + 1;
    });

    this.occurenceInArray = Object.entries(this.knownfor_occurences);
    const sortedKnownFors = this.occurenceInArray.sort((a, b) => b[1] - a[1]);
    let topWaitingfor = sortedKnownFors[0];
    await this.updateKnownForOfCake.execute(cake.id, topWaitingfor[0]);

    return { order: order ? order : {} };
  }
}
