/**
 * import the required packages
 */
import { Order } from '../../domainLayer/entities.ts/order.entity';
import { OrderDto } from '../../dtos/Order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
/**
 * interface to make an order
 */
export interface OrderRepository {
  findAll(): Promise<OrderDto[]>
  findPlacedOrders(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto>;
  findReceivedOrders(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto>;
  create(order: OrderDto): Promise<Object>;
  findById(order_id: string): Promise<OrderDto>;
  changeStatus(order_id: string, new_status: string): Promise<OrderDto>;
  findAllPaymentWaitingOrders(): Promise<OrderDto[]>;
  getOrderToAnalyse(level:number):Promise<OrderDto[]>
}
