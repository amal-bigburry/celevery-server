import { StoreDto } from "src/common/dtos/store.dto";
export interface GetStoreInterface {
    getstore(store_id: string): Promise<StoreDto>;
}