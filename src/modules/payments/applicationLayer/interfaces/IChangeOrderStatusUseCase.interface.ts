/**
 * importing the required packages
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * interface to change the status of the order
 */
export interface IChangeOrderStatusUseCase {
  execute(updatedstatus): Promise<OrderDto>;
}
