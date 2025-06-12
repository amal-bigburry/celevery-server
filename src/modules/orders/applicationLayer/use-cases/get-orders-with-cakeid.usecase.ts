import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderDto } from "src/common/dtos/Order.dto";
import { GetOrdersWithCakeIdInterface } from "src/common/interfaces/get-orders-with-cakeid.interface";

  export class GetOrdersWithCakeIdImp implements GetOrdersWithCakeIdInterface{
    
  constructor(@InjectModel('Order') private orderModel: Model<OrderDto>) {}
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