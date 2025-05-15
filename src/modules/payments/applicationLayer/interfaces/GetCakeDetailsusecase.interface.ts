/**
 * importing the required packages
 */
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
/**
 * interface to get the cake details
 */
export interface IGetCakeDetailsUseCase {
  execute(cake_id: string): Promise<CakeEntity>;
}
