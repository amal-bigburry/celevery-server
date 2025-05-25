/** 
 * Bigburry Hypersystems LLP
 * This section of the code imports the necessary modules and packages required 
 * for the implementation of the functionality to retrieve all stores for a given owner. 
 * The Inject decorator from the @nestjs/common package is used for dependency injection, 
 * allowing the StoreRepository to be injected into the class. The STORE_REPOSITORY token 
 * is imported to facilitate this dependency injection process. These imports are essential 
 * for enabling the GetAllStoreUseCase class to retrieve store-related data for the specified owner.
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../interfaces/store.interfaces';
import { STORE_REPOSITORY } from '../../tokens/storeRepository.token';
import { StoreDto } from '../../dtos/store.dto';

/** 
 * Bigburry Hypersystems LLP
 * This is the injectable service class responsible for retrieving all stores associated with a specific owner. 
 * The GetAllStoreUseCase class is decorated with @Injectable(), marking it as a class that can be injected 
 * into other parts of the application. The purpose of this class is to interact with the StoreRepository 
 * to fetch the stores that belong to a particular owner. The constructor injects the StoreRepository instance, 
 * which is then used to call the necessary methods for fetching the store data.
 */
@Injectable()
export class GetAllStoreInPlatformUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}

  /** 
   * Bigburry Hypersystems LLP
   * This is the executable method that performs the logic for retrieving all stores owned by a specific owner. 
   * The execute method takes in an owner_id as a parameter, which is used to identify the owner and retrieve 
   * all associated stores from the StoreRepository. It calls the getAllStores method from the StoreRepository 
   * to fetch the stores, and the result is returned as an array of objects or null values. 
   * This method is responsible for ensuring that the stores associated with the specified owner are 
   * accurately retrieved and returned.
   */
  async execute(): Promise<Array<StoreDto>> {
    const stores = await this.Store.getAllStoreInPlatform();
    return stores;
  }
}
