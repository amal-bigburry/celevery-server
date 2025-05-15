/**
 * importing required packages
 */
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repositoty';
import { ChangeOrderStatusDto } from '../../dtos/changeOrderStatus.dto';
import ORDER_STATUS from 'src/common/utils/contants';
import { Order } from '../../domainLayer/entities.ts/order.entity';
import { ORDER_REPOSITORY } from '../tokens/orderRepository.token';
import { INotificationUseCase } from '../interfaces/NotificationUsecase.interface';
import { IGetCakeDetailsUseCase } from '../interfaces/GetCakeDetailsusecase.interface';
import { IGetStoreUsecase } from '../interfaces/GetStoreusecase.interface';
import { IGetUserDetailUseCase } from '../interfaces/GetuserDetailsUsecase.interface';
import { OrderDto } from '../../dtos/Order.dto';
import { GET_CAKE_DETAILS } from '../tokens/get_cake_details.token';
import { NOTIFICATION_USECASE } from '../tokens/notificationusecase.token';
import { GET_USER_DETAILS } from '../tokens/get_user_details.token';
import { GET_STORE_DETAILS } from '../tokens/get_store_details.token';
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
    @Inject(GET_STORE_DETAILS) // Replace with actual type
    private readonly getStoreUsecase: IGetStoreUsecase, // Replace with actual type
  ) {}
  async execute(
    changeOrderStatusDto: ChangeOrderStatusDto,
  ): Promise<OrderDto> {
    /**
     * Check order availablity and status
     */
    let order = await this.OrderRepository.findById(
      changeOrderStatusDto.order_id,
    );
    /**
     * validate the order id
     */
    if (!order) {
      throw new UnauthorizedException('Order not found');
    }
    /**
     * validate whether the order is already cancelled.
     */
    if (order.order_status == ORDER_STATUS.CANCELLED) {
      throw new BadRequestException('Its a Cancelled Order');
    }
    /**
     * Validate the user id belongs to the seller, Status can only be changed if the order belongs to that seller.
     */
    let thiscake = await this.getCakeDetailsUseCase.execute(order.cake_id)
    let seller_id = (await this.getStoreUsecase.execute(thiscake.store_id)).store_owner_id
    // console.log(seller_id, changeOrderStatusDto.user_id)
    if (seller_id != changeOrderStatusDto.user_id){
      throw new BadRequestException('This order do not belongs to you, So you are not permited to change the status of this order.')
    }
    /**
     * Send the Request to change the
     */
    // console.log(changeOrderStatusDto)
    let updated_order:OrderDto;
    updated_order = await this.OrderRepository.changeStatus(
      changeOrderStatusDto.order_id,
      changeOrderStatusDto.new_status,
    );
    /**
     * get the seller details of this order
     */
    let seller = await this.getuserDetailsUseCase.execute(seller_id);
    /**
     * validate the seller
     */
    if (!seller) {
      throw new UnauthorizedException('Cake seller not found');
    }
    /**
     * get the buyer details of the order
     */
    let buyer = await this.getuserDetailsUseCase.execute(order.buyer_id);
    /**
     * validate the buyer
     */
    if (!buyer) {
      throw new UnauthorizedException('Customer not found');
    }
    /**
     * get the cake details of the order
     */
    let cake = await this.getCakeDetailsUseCase.execute(order.cake_id);
    /**
     * validate the cake
     */
    if (!cake) {
      throw new UnauthorizedException('Cake not found');
    }
    /**
     * Notifying seller and buyer About the status that says its time to pay
     */
    // if (changeOrderStatusDto.new_status === ORDER_STATUS.WAITINGTOPAY) {
    //   // sending to the cake seller
    //   await this.notificationUseCase.execute({
    //     title: 'You have Confirmed the Order. Please wait for the Buyer to Pay',
    //     message: `Order Confirmed for the buyer ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Will be Ready before ${order.need_before}. You can track your order from My orders.`,
    //     token: seller.fcm_token,
    //   });
    //   // sending to the buyer
    //   await this.notificationUseCase.execute({
    //     title: 'Your Order has been Confirmed< Please Do the Payment',
    //     message: `Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Collect it before ${order.need_before}`,
    //     token: buyer.fcm_token,
    //   });
    // } else if (changeOrderStatusDto.new_status === ORDER_STATUS.DELIVERED) {
    //   /**
    //    * Notifying buyer and buyer About the order status when status becomes delivered
    //    */
    //   // sending to the cake buyer
    //   await this.notificationUseCase.execute({
    //     title: `Thank You, Delivery of the Order ${changeOrderStatusDto.order_id} is Confirmed`,
    //     message: `Delivery confirmed for ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Customer Needs it before ${order.need_before}`,
    //     token: seller.fcm_token,
    //   });
    //   // // sending to the buyer
    //   await this.notificationUseCase.execute({
    //     title: 'Thank You, Your Order has been Delivered. Hope you like it',
    //     message: `Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Needs it before ${order.need_before}`,
    //     token: buyer.fcm_token,
    //   });
    // } else if (changeOrderStatusDto.new_status === ORDER_STATUS.CANCELLED) {
    //   /**
    //    * Notify buyer and buyer About the order status when order gets canceled by either buyer or buyer after request
    //    */
    //   await this.notificationUseCase.execute({
    //     title: 'Your Order has been Cancelled',
    //     message: `Order from ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}.  Needs it before ${order.need_before}. Is Cancelled.`,
    //     token: seller.fcm_token,
    //   });
    //   // sending to the buyer
    //   await this.notificationUseCase.execute({
    //     title: 'Your Order has been Cancelled',
    //     message: `Order of Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Needs it before ${order.need_before}, is Cancelled.`,
    //     token: buyer.fcm_token,
    //   });
    // } else if (changeOrderStatusDto.new_status === ORDER_STATUS.PAID) {
    //   /**
    //    * Notify buyer and buyer About the order status when order gets canceled by either buyer or buyer after request
    //    */
    //   await this.notificationUseCase.execute({
    //     title:
    //       'buyer Paid for Your cake. Time to Make the cake Ready to Deliver!',
    //     message: `Order from ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}.  Needs it before ${order.need_before}. Is Cancelled.`,
    //     token: seller.fcm_token,
    //   });
    //   // sending to the buyer
    //   await this.notificationUseCase.execute({
    //     title: 'Thank You for the Payment, Your cake is getting Ready.',
    //     message: `Order of Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Needs it before ${order.need_before}, is Cancelled.`,
    //     token: buyer.fcm_token,
    //   });
    // } else if (changeOrderStatusDto.new_status === ORDER_STATUS.PREPAIRING) {
    //   /**
    //    * Notify buyer and buyer About the order status when order gets canceled by either buyer or buyer after request
    //    */
    //   await this.notificationUseCase.execute({
    //     title: 'Order Marked as Prepairing Successfully',
    //     message: `Order from ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}.  Needs it before ${order.need_before}. Is Cancelled.`,
    //     token: seller.fcm_token,
    //   });
    //   // sending to the buyer
    //   await this.notificationUseCase.execute({
    //     title: 'Your Order is Getting prepaired',
    //     message: `Order of Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Needs it before ${order.need_before}, is Cancelled.`,
    //     token: buyer.fcm_token,
    //   });
    // } else if (changeOrderStatusDto.new_status === ORDER_STATUS.WAITINGFORPICKUP) {
    //   /**
    //    * Notify buyer and buyer About the order status when order gets canceled by either buyer or buyer after request
    //    */
    //   await this.notificationUseCase.execute({
    //     title: 'Order Status Marked as Waiting to Pickup',
    //     message: `Order from ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}.  Needs it before ${order.need_before}. Is Cancelled.`,
    //     token: seller.fcm_token,
    //   });
    //   // sending to the buyer
    //   await this.notificationUseCase.execute({
    //     title:
    //       'Your Order Is Ready, You can Go to the location and Collect it. All the best wishes from Cake Factory!',
    //     message: `Order of Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Needs it before ${order.need_before}, is Cancelled.`,
    //     token: buyer.fcm_token,
    //   });
    // } else if (changeOrderStatusDto.new_status === ORDER_STATUS.UNDELIVERED) {
    //   /**
    //    * Notify buyer and buyer About the order status when order gets canceled by either buyer or buyer after request
    //    */
    //   await this.notificationUseCase.execute({
    //     title: 'Order Status Marked as Waiting for UnDelivery',
    //     message: `Order from ${buyer.email} for ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}.  Needs it before ${order.need_before}. Is Cancelled.`,
    //     token: seller.fcm_token,
    //   });
    //   // sending to the buyer
    //   // start the refunc process
    //   await this.notificationUseCase.execute({
    //     title:
    //       'Your Order was Unable to Delivered. Seller Is Sorry for that. Your Amount Will be Refunded within 2 days from Now.',
    //     message: `Order of Cake Model - ${cake.cake_name} of variant with weight of ${cake.cake_variants[0].weight} kg, price of ${cake.cake_variants[0].cake_price} and quantity of ${order.quantity}. Needs it before ${order.need_before}, is Cancelled.`,
    //     token: buyer.fcm_token,
    //   });
    // }
    /**returns the new updated order back to the request */
    return updated_order
    // return { order: order ? order : {} };
  }
}
