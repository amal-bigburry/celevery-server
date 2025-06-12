/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This file defines the implementation of the GetOrdersWithCakeId interface.
 * The GetOrdersWithCakeIdImp class fetches orders based on a given cake_id from the database.
 * It interacts with the MongoDB model (Order) to retrieve a list of orders that contain the specified cake_id.
 * This class is a part of the application layer responsible for querying and returning order data related to cakes.
 * 
 * Dependencies:
 * - OrderModel: Mongoose model representing orders in the database.
 * - GetOrdersWithCakeId: Interface defining the contract for fetching orders based on cake_id.
 * - CakeDto: Data Transfer Object for Cake, although not directly used here.
 * - OrderDto: Data Transfer Object for Order, used to represent the fetched order data.
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/modules/orders/domainLayer/entities.ts/order.entity';
import { OrderDto } from 'src/common/dtos/Order.dto';
import { GetOrdersWithCakeIdInterface } from 'src/common/interfaces/get-orders-with-cakeid.interface';
/**
 * GetOrdersWithCakeIdImp class implements the GetOrdersWithCakeId interface.
 * It provides the logic for retrieving orders that are associated with a specific cake_id from the database.
 */
export class GetOrdersWithCakeIdImp implements GetOrdersWithCakeIdInterface {
  /**
   * Constructor to inject the Mongoose Order model.
   * This model allows querying the orders collection in the MongoDB database.
   */
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDto>) {}
  /**
   * Execute method to fetch orders associated with a specific cake_id.
   * 
   * @param cake_id The ID of the cake to fetch orders for.
   * @returns A promise that resolves to an array of OrderDto objects representing the orders with the specified cake_id.
   */
  async execute(cake_id: string): Promise<OrderDto[]> {
    /**
     * Finds orders in the database where the cake_id matches the provided cake_id.
     * It limits the results to 50 orders to avoid excessive data retrieval.
     */
    let orders = await this.orderModel.find({
      cake_id: cake_id,
    }).limit(50);
    /**
     * Returns the list of orders that contain the specified cake_id.
     */
    return orders;
  }
}
