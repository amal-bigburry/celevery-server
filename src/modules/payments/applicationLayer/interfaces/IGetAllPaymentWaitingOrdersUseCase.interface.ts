/**
 * importing the required packages
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * interface to get all the payments waiting for the order
 */
export interface IGetAllPaymentWaitingOrdersUseCase {
  execute(): Promise<OrderDto[]>;
}
