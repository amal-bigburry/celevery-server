/**
 * importing required packages
 * 
 * This section imports the necessary data transfer object (DTO) files that represent the structure of data 
 * for cakes (`CakeDto`) and stores (`StoreDto`). These DTOs are used to transfer data between different layers of 
 * the application, ensuring that the structure of the data is consistent and well-defined throughout.
 * 
 * The `CakeDto` represents the data format for cake-related information, while the `StoreDto` defines the data 
 * structure for a store, including details such as store owner, store name, etc. These are essential for interactions 
 * with the store and cake data.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { StoreDto } from '../../dtos/store.dto';
import { UpdateStoreDto } from '../../dtos/updateStore.dto';

/**
 * The `StoreRepository` interface defines the operations related to store management. It specifies the expected 
 * behavior of any class or service that will implement this interface. This repository manages the interaction 
 * with the data layer for store entities and provides methods for creating, updating, retrieving, and deleting stores.
 * 
 * The methods defined in this interface are:
 * - `createStore`: Accepts a `StoreDto` and two files (`license_file` and `idProofFile`), and returns a `Promise<string>`, 
 *   indicating the result of store creation, potentially including the store's ID or other relevant details.
 * - `getStore`: Retrieves a store by its ID (`store_id`) and returns a `Promise<StoreDto>`, which includes the details 
 *   of the store.
 * - `updateStore`: Updates a specific field of the store by accepting a `store_id`, the field name (`field`), and the new 
 *   value (`value`), returning a `Promise<string>` with the result of the update operation.
 * - `deleteStore`: Deletes a store, returning a `Promise<string>`, which might contain a confirmation message or an 
 *   identifier of the deleted store.
 * - `getAllStores`: Retrieves all stores associated with a specific store owner by `store_owner_id`, returning an array of 
 *   `StoreDto` objects wrapped in a `Promise<Array<StoreDto>>`.
 * - `getAllStoreCakes`: Retrieves all cakes associated with a specific store by `store_id`, returning an array of 
 *   `CakeDto` objects wrapped in a `Promise<Array<CakeDto>>`.
 * 
 * The `StoreRepository` interface provides an abstraction over the underlying store management logic. This abstraction 
 * makes it easy to change the data layer or storage mechanisms without affecting the rest of the application.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export interface StoreRepository {
  createStore(
    storeDto: StoreDto,
    license_file: Express.Multer.File,
    idProofFile: Express.Multer.File,
  ): Promise<string>;
  getStore(store_id: string): Promise<StoreDto>;
  updateStore(UpdateStoreDto:UpdateStoreDto): Promise<string>;
  deleteStore(): Promise<string>;
  getAllStores(store_owner_id: string): Promise<Array<StoreDto>>;
  getAllStoreInPlatform(): Promise<Array<StoreDto>>;
  getAllStoreCakes(store_id: string): Promise<Array<CakeDto>>;
}
