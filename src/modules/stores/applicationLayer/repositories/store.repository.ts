/**
 * importing required packages
 */
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { StoreDto } from '../../Dtos/store.dto';
/**
 * interface for store repository
 */
export interface StoreRepository {
  createStore(
    storeDto: StoreDto,
    license_file: Express.Multer.File,
    idProofFile: Express.Multer.File,
  ): Promise<string>;
  getStore(store_id: string): Promise<StoreDto>;
  updateStore(store_id: string, field: string, value: string): Promise<string>;
  deleteStore(): Promise<string>;
  getAllStores(store_owner_id: string): Promise<Array<StoreDto>>;
  getAllStoreCakes(store_id: string): Promise<Array<CakeDto>>;
}
