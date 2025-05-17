import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { GetOrdersWithCakeId } from 'src/modules/orders/applicationLayer/interfaces/GetOrdersWithCakeId.interface';
import { Order } from 'src/modules/orders/domainLayer/entities.ts/order.entity';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';

export class GetOrdersWithCakeIdImp implements GetOrdersWithCakeId {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDto>) {}
  async execute(cake_id: string): Promise<OrderDto[]> {
    let orders = await this.orderModel.find({
      cake_id: cake_id,
    }).limit(50);
    return orders;
  }
}
