/**
 * importing the required packages
 */
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderDto } from '../../dtos/Order.dto';
import { OrderRepository } from '../repositories/order.repositoty';
import { ORDER_REPOSITORY } from '../tokens/orderRepository.token';
import { PopDto } from 'src/modules/mqtt/dtos/pop.dto';
import { INotificationUseCase } from '../interfaces/NotificationUsecase.interface';
import { IGetStoreUsecase } from '../interfaces/GetStoreusecase.interface';
import { IGetUserDetailUseCase } from '../interfaces/GetuserDetailsUsecase.interface';
import { IGetCakeDetailsUseCase } from '../interfaces/GetCakeDetailsusecase.interface';
import { IMqttService } from '../interfaces/MqttService.interface';
import { NOTIFICATION_USECASE } from '../tokens/notificationusecase.token';
import { GET_STORE_DETAILS } from '../tokens/get_store_details.token';
import { GET_USER_DETAILS } from '../tokens/get_user_details.token';
import { GET_CAKE_DETAILS } from '../tokens/get_cake_details.token';
import { MQTTTOKEN } from '../tokens/mqtt.token';
import { GET_ORDERS_OFCAKE } from '../tokens/get_orders_with_cakeid.token';
import { GetOrdersWithCakeId } from '../interfaces/GetOrdersWithCakeId.interface';
import { UPDATE_KNOWN_FOR_IN_CAKE } from '../tokens/update_known_for_in_cake.token';
import { UpdateKnownForOfCakeUseCase } from '../interfaces/UpdateKnownForOfCakeUseCase.interface';
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
    private readonly mqttService: IMqttService, // Replace with actual type
  ) {}
  /**
   * executable file
   */
  async execute(orderDto: OrderDto): Promise<{ order: Object }> {
    // send push notification to the cake buyer and the buyer
    /**
     * validate the cake
     */
    let cake = await this.getCakeDetailsUseCase.execute(orderDto.cake_id);
    if (!cake) {
      throw new UnauthorizedException('Cake not found');
    }
    let store_id = cake.store_id;
    let store = await this.getstoreUsecase.execute(store_id);
    let buyer_id = orderDto.buyer_id;
    store.store_owner_id = store.store_owner_id;

    // console.log('hello')
    let cake_seller = await this.getuserDetailsUseCase.execute(
      store.store_owner_id,
    );
    // console.log('hello')
    /**
     * validate the seller
     */
    if (!cake_seller) {
      throw new UnauthorizedException('Cake seller not found');
    }

    orderDto.seller_id = store.store_owner_id;

    let buyer = await this.getuserDetailsUseCase.execute(buyer_id);
    if (!buyer) {
      throw new UnauthorizedException('buyer not found');
    }
    // console.log('buyer')
    if (cake?.cake_variants?.length == 0) {
      throw new BadRequestException('invalid varient id');
    }
    /**
     * create new order by setting the status as Requested
     */
    orderDto.payment_tracking_id = '';
    let order = await this.OrderRepository.create(orderDto);

    /**
     * Get all the orders of the cake from db.
     * Arrage the orders with known_for
     * Find the  top known_for
     * Update the cake known_for with that one
     */
    let AllordersWithTheCurrentCake = await this.getOrdersWithCakeId.execute(
      orderDto.cake_id,
    );
    // console.log(AllordersWithTheCurrentCake)
    this.knownfor_occurences = [];
    AllordersWithTheCurrentCake.forEach((order) => {
      this.knownfor_occurences[order.known_for] =
        (this.knownfor_occurences[order.known_for] || 0) + 1;
    });

    this.occurenceInArray = Object.entries(this.knownfor_occurences);
    const sortedKnownFors = this.occurenceInArray.sort((a, b) => b[1] - a[1]);
    let topWaitingfor = sortedKnownFors[0];
    await this.updateKnownForOfCake.execute(cake.id,topWaitingfor[0])
    /**
     * Sends push notification to the buyer
     */

    // await this.notificationUseCase.execute({
    //   title: 'New Order Received',
    //   message: `New order received from ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[orderDto.cake_variant_id].weight} kg, price of ${cake.cake_variants[orderDto.cake_variant_id].cake_price} and quantity of ${orderDto.quantity}. Customer Needs it before ${orderDto.need_before}`,
    //   token: cake_seller.fcm_token,
    // });
    // /**
    //  * sends push notification to the buyer
    //  */
    // await this.notificationUseCase.execute({
    //   title: 'Order Placed - Requested',
    //   message: `Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[orderDto.cake_variant_id].weight} kg, price of ${cake.cake_variants[orderDto.cake_variant_id].cake_price} and quantity of ${orderDto.quantity}. Needs it before ${orderDto.need_before}`,
    //   token: buyer.fcm_token,
    // });
    // /**
    //  * send a trigger to sellers app to show the pop up and alert the buyer about the order
    //  */
    // let data: PopDto = {
    //   topic: store.store_owner_id,
    //   message: `New order received from ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[orderDto.cake_variant_id].weight} kg, price of ${cake.cake_variants[orderDto.cake_variant_id].cake_price} and quantity of ${orderDto.quantity}. Customer Needs it before ${orderDto.need_before}`,
    // };
    // await this.mqttService.publish(data);
    /**
     * return the order
     */
    return { order: order ? order : {} };
  }
}
