import { StoreDto } from "src/common/dtos/store.dto";
export interface IGetStoreInterface {
    getstore(store_id: string): Promise<StoreDto>;
}