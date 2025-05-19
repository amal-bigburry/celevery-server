import { CakeEntity } from "src/modules/cakes/domainLayer/entities/cake.entity";
import { CakeDto } from "src/modules/cakes/dtos/cake.dto";

export interface FavouritesRepository {
  /**
   * retrieves the privacy policy content
   */
  add(user_id:string, cake_id:string): Promise<string>;
  remove(user_id:string, cake_id:string): Promise<string>;
  get(user_id:string): Promise<Array<CakeEntity>>;
}