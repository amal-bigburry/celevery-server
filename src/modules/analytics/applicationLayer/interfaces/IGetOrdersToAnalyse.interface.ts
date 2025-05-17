/**
 * Importing required packages
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * Interface of cakerepository
 */
export interface IGetOrdersToAnalyse {
  execute(level:number): Promise<OrderDto[]>;
}
