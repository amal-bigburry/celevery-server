import { CakeEntity } from "src/modules/cakes/domainLayer/entities/cake.entity";

export interface IGetCakeDetailsUseCase {
  execute(cake_id:string): Promise<CakeEntity>;
}