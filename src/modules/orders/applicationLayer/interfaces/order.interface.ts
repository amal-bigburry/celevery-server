/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Import the required packages
 */
import { Order } from '../../domainLayer/entities.ts/order.entity';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ChangeOrderStatusDto } from 'src/common/dtos/changeOrderStatus.dto';
/**
 * Interface to manage orders in the system
 */
export interface OrderInterface {
  // get
  findAll(): Promise<OrderDto[]>;
  findPlacedOrders(
    user_id: string,
  ): Promise<object[]>;
  findReceivedOrders(
    user_id: string,
    store_id:string,
  ): Promise<object[]>;
  findById(_id: string): Promise<OrderDto>;
  findAllPaymentWaitingOrders(): Promise<OrderDto[]>;
  getOrderToAnalyse(level: number): Promise<OrderDto[]>;
  getOrderDetails(_id: string): Promise<OrderDto>;
  // create
  create(order: OrderDto): Promise<OrderDto>;
  // udpate
  changeStatus(_id: string, new_status: string): Promise<OrderDto>;
  changeStatusToCancel(data: ChangeOrderStatusDto): Promise<OrderDto>;
}
