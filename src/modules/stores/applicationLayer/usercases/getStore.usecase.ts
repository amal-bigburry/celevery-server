/** 
 * Bigburry Hypersystems LLP
 * This section of the code imports the necessary modules and packages that are required 
 * for retrieving the details of a specific store. The Inject decorator from the @nestjs/common 
 * package is used to inject the StoreRepository, which handles the interactions with the store data. 
 * The StoreDto is imported to ensure that the data returned from the repository adheres to the 
 * structure of a store. The STORE_REPOSITORY token is imported to enable the injection of the 
 * StoreRepository through NestJS's dependency injection system. These imports are essential for 
 * enabling the getStoreUsecase class to perform the required functionality of retrieving store data.
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { StoreDto } from '../../Dtos/store.dto';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';

/** 
 * Bigburry Hypersystems LLP
 * This is the injectable service class responsible for fetching the details of a store. 
 * The getStoreUsecase class is decorated with @Injectable(), which allows it to be used 
 * throughout the application as a service. This class’s purpose is to interact with the 
 * StoreRepository to retrieve the specific details of a store using its store_id. The constructor 
 * injects the StoreRepository instance to provide access to the store-related methods.
 */
@Injectable()
export class getStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}

  /** 
   * Bigburry Hypersystems LLP
   * This method is responsible for retrieving the details of a store based on its unique store_id. 
   * The execute method takes the store_id as an input parameter and calls the getStore method 
   * of the StoreRepository to fetch the store data. The fetched store details are then returned 
   * as a StoreDto object, ensuring that the structure of the returned data adheres to the store 
   * details defined in the StoreDto class. This method is essential for retrieving and delivering 
   * the relevant store details to the caller.
   */
  async execute(store_id: string): Promise<StoreDto> {
    const store = await this.Store.getStore(store_id);
    return store;
  }
}
