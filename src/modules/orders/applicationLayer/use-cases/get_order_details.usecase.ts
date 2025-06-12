/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { OrderInterface} from '../interfaces/order.interface';
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { OrderDetailDto } from 'src/common/dtos/orderDetail.dto';
import { GETSTOREINTERFACETOKEN } from '../../tokens/get_store_details.token';
import { GetstoreInterface } from '../../../../common/interfaces/get-store.interface';
import { GETUSERDETAILINTERFACETOKEN } from '../../tokens/get_user_details.token';
import { GetOrderDetailsInterface } from 'src/common/interfaces/get-order-details.interface';
import { GetCakeDetailInterface } from 'src/common/interfaces/get-cake-details.interface';
import { GetUserDetailInterface } from 'src/common/interfaces/get-user-details.interface';
import { CAKEDETAILINTERFACETOKEN } from '../../tokens/get_cake_details.token';

/**
 * injectable service file that get all the recieved orders of a seller
 */
@Injectable()
export class GetOrderDetailsUseCase implements GetOrderDetailsInterface {
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
    @Inject(CAKEDETAILINTERFACETOKEN)
    private readonly GetCakeDetailsUseCase: GetCakeDetailInterface,
    @Inject(GETUSERDETAILINTERFACETOKEN)
    private readonly GetUserDetailUseCase: GetUserDetailInterface,
    @Inject(GETSTOREINTERFACETOKEN)
    private readonly GetStoreDetailUseCase: GetstoreInterface, // Assuming CakeRepository is used to get cake details
  ) {}
  /**
   * execuable funtion
   */
  async execute(_id: string): Promise<OrderDetailDto> {
    const order = await this.OrderRepository.findById(_id);
    // console.log('Order Details:', order);
    if (!order) {
      throw new Error('Order not found');
    }
    let cake = await this.GetCakeDetailsUseCase.execute(order.cake_id);
    let buyer = await this.GetUserDetailUseCase.execute(order.buyer_id);
    let seller = await this.GetUserDetailUseCase.execute(order.seller_id);
    let store = await this.GetStoreDetailUseCase.execute(cake.store_id);
    let variant = cake.cake_variants.find(variant => variant._id == order.cake_variant_id);
    if (!variant) {
      throw new Error('Cake variant not found');
    }

    let finalOrderDetails = {
      _id: order.id,
      cake_variant_id: order.cake_variant_id,
      payment_tracking_id: order.payment_tracking_id,
      need_before: order.need_before,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      order_status: order.order_status,
      variant_weight: variant?.weight,
      // _id: order._id,
      cake_id: order.cake_id,
      cake_name: cake.cake_name,
      cake_image: cake.cake_image_urls[0],
      cake_price: variant?.cake_price,
      cake_description: cake.cake_description,
      quantity: order.quantity,
      buyer_id: order.buyer_id,
      seller_id: order.seller_id,
      buyer_name: buyer.display_name,
      store_address: store.address,
      store_lat:store.lat,
      store_log:store.log,
      seller_name: seller.display_name,
      text_on_cake: order.text_on_cake,
      known_for: order.known_for,
      cancelled_by: order.cancelled_by,
      cancellation_reason: order.cancellation_reason,
      buyer_contact_number: order.buyer_contact_number,
      seller_contact_number: order.seller_contact_number,
      session_id:order.session_id
    };
    return finalOrderDetails;
  }
}
