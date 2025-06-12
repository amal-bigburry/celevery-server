import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from 'src/common/dtos/Order.dto';
import { UpdateSessionidUseCaseInterface } from 'src/common/interfaces/update-session-id.interface';

export class UpdateSessionidUseCase implements UpdateSessionidUseCaseInterface {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDto>) {}
  /**
   * Execute method to fetch orders associated with a specific cake_id.
   *
   * @param cake_id The ID of the cake to fetch orders for.
   * @returns A promise that resolves to an array of OrderDto objects representing the orders with the specified cake_id.
   */
  async execute(order_id: string, session_id: string): Promise<string> {
    /**
     * Finds orders in the database where the cake_id matches the provided cake_id.
     * It limits the results to 50 orders to avoid excessive data retrieval.
     */
    let order = await this.orderModel.findById(order_id);
    if (order) order.session_id = session_id;
    order?.save();

    return '';
  }
}
