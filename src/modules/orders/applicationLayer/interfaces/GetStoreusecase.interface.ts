import { StoreDto } from "src/modules/stores/Dtos/store.dto";

export interface IGetStoreUsecase {
  execute(store_id:string): Promise<StoreDto>;
}