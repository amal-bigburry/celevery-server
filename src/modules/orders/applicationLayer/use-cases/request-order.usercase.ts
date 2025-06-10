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
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { NOTIFICATIONINTERFACETOKEN } from '../../tokens/notificationusecase.token';
import { GETSTOREINTERFACETOKEN } from '../../tokens/get_store_details.token';
import { GETUSERDETAILINTERFACETOKEN } from '../../tokens/get_user_details.token';
import { CAKEDETAILINTERFACETOKEN } from '../../tokens/get_cake_details.token';
import { MQTTTOKEN } from '../../tokens/mqtt.token';
import { GETORDERWITHCAKEIDTOKEN } from '../../tokens/get_orders_with_cakeid.token';
import { UPDATE_KNOWN_FOR_IN_CAKE } from '../../tokens/update_known_for_in_cake.token';
import { STORE_STATUS } from 'src/common/utils/contants';
import { PopDto } from 'src/common/dtos/pop.dto';
import { getCurrentDayName } from 'src/common/utils/getCurrentDayName';
import { isStoreOpen } from 'src/common/utils/isStoreOpen';
import { orderQueue } from 'src/common/utils/order.queque';
import { AutoCancelWorker } from './auto-cancel.usecase';
import { ConfigService } from '@nestjs/config';
import { OrderInterface } from '../interfaces/order.interface';
import { NotificationInterface } from '../interfaces/notification.interface';
import { GetstoreInterface } from '../interfaces/get-store.interface';
import { GetUserDetailInterface } from '../interfaces/get-user-details.interface';
import { CakeDetailsInterface } from '../interfaces/get-cake-details.interface';
import { UpdateKnownForInterface } from '../interfaces/update-knownfor.interface';
import { MqttServiceInterface } from '../interfaces/mqtt-service.interface';
import { GetOrdersWithCakeIdInterface } from '../interfaces/get-orders-with-cakeid.interface';
/**
 * injectable service file that makes an order request
 */
@Injectable()
export class RequestOrderUseCase {
  private orders: OrderDto[] = [];
  private knownfor_occurences = {};
  private occurenceInArray: any;
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
    @Inject(NOTIFICATIONINTERFACETOKEN)
    private readonly notificationUseCase: NotificationInterface,
    @Inject(GETSTOREINTERFACETOKEN)
    private readonly getstoreUsecase: GetstoreInterface,
    @Inject(GETUSERDETAILINTERFACETOKEN)
    private readonly getuserDetailsUseCase: GetUserDetailInterface,
    @Inject(CAKEDETAILINTERFACETOKEN)
    private readonly getCakeDetailsUseCase: CakeDetailsInterface,
    @Inject(GETORDERWITHCAKEIDTOKEN)
    private readonly getOrdersWithCakeId: GetOrdersWithCakeIdInterface,
    @Inject(UPDATE_KNOWN_FOR_IN_CAKE)
    private readonly updateKnownForOfCake: UpdateKnownForInterface,
    @Inject(MQTTTOKEN)
    private readonly mqttService: MqttServiceInterface,
    private readonly AutoCancelWorker: AutoCancelWorker,
    private readonly configService: ConfigService, // Assuming you have a worker for auto-cancel
  ) {}
  /**
   * executable file
   */
  async execute(orderDto: OrderDto): Promise<{ order: Object }> {
    // get the cake details from the cakeid
    let cake = await this.getCakeDetailsUseCase.getcakedetail(orderDto.cake_id);
    // Validate if the cake exists
    if (!cake) throw new UnauthorizedException('Cake not found');
    // get the store details from the order
    let store = await this.getstoreUsecase.getstore(cake.store_id);
    orderDto.seller_id = store.store_owner_id;
    // confirms that the store is open
    if (store.store_status != STORE_STATUS.APPROVED) {
      throw new BadRequestException('The store is not approved');
    }
    const currentDay = getCurrentDayName().toLowerCase(); // e.g., "monday"
    const openAt = store[`${currentDay}_open_at`];
    const closeAt = store[`${currentDay}_close_at`];
    console.log(closeAt, openAt);
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
    let buyer = await this.getuserDetailsUseCase.getuserdetail(orderDto.buyer_id);
    if (!buyer) throw new UnauthorizedException('buyer not found');
    let seller = await this.getuserDetailsUseCase.getuserdetail(orderDto.seller_id);
    if (!seller) throw new UnauthorizedException('seller not found');
    if (buyer._id === seller._id)
      throw new UnauthorizedException(
        'Buyer and Seller cannot be the same person',
      );
    orderDto.payment_tracking_id = '';
    let order = await this.OrderRepository.create(orderDto);
    let AllordersWithTheCurrentCake = await this.getOrdersWithCakeId.execute(
      orderDto.cake_id,
    );
    let variant = cake.cake_variants.find(
      (v) => v._id === orderDto.cake_variant_id,
    );
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
    let data: PopDto = {
      topic: store.store_owner_id,
      message: `{type:"order_request",data:"New order received from ${buyer.email} for ${cake.cake_name} of variant with weight of ${variant?.weight} kg, price of ${variant?.cake_price} and quantity of ${orderDto.quantity}. Customer Needs it before ${orderDto.need_before}"`,
    };
    await this.mqttService.publish(data);
    await orderQueue.add(
      'cancel-if-unprocessed',
      { orderId: order.id },
      {
        delay: 60 * (parseInt(this.configService.get<string>('AUTOCANCEL_ORDER_AFTER')||'') * 1000), // 1 minute
      },
    );
    this.knownfor_occurences = [];
    AllordersWithTheCurrentCake.forEach((order) => {
      this.knownfor_occurences[order.known_for] =
        (this.knownfor_occurences[order.known_for] || 0) + 1;
    });
    this.occurenceInArray = Object.entries(this.knownfor_occurences);
    const sortedKnownFors = this.occurenceInArray.sort((a, b) => b[1] - a[1]);
    let topWaitingfor = sortedKnownFors[0];
    await this.updateKnownForOfCake.execute(cake._id, topWaitingfor[0]);
    return { order: order ? order : {} };
  }
}
