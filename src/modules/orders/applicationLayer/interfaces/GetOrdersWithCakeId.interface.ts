import { OrderDto } from "../../dtos/Order.dto";

export interface GetOrdersWithCakeId {
  execute(cake_id:string): Promise<OrderDto[]>;
}