/**
 * dot to handle the otder
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * interface to get the order details
 */
export interface IGetOrderDetailsUseCaese {
  execute(order_id: string): Promise<OrderDto>;
}
