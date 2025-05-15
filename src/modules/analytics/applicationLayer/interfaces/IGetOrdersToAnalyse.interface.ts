/**
 * Importing required packages
 */
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * Interface of cakerepository
 */
export interface IGetOrdersToAnalyse {
  execute(level:number): Promise<OrderDto[]>;
}
