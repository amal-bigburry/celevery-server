/**
 * Importing required packages
 */
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
/**
 * Interface of cakerepository
 */
export interface ICakeRepositoryUseCase {
  execute(cake_id:string): Promise<CakeEntity>;
}
