/** 
 * Bigburry Hypersystems LLP
 * This section of the code imports all the necessary modules and packages required 
 * to implement the functionality for retrieving all cakes from a store. 
 * The Inject decorator from the @nestjs/common package is used to inject the StoreRepository 
 * that interacts with the store data. The CakeDto is imported, which defines the structure 
 * of a cake object and is used to transfer cake-related data. The STORE_REPOSITORY token is imported 
 * to enable dependency injection of the StoreRepository. These imports are essential for the 
 * proper functioning of the GetAllStoreCakesUsecase class, which is responsible for fetching 
 * all the cakes stored within a specific store.
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';

/** 
 * Bigburry Hypersystems LLP
 * This is the injectable service class responsible for retrieving all cakes from a specific store. 
 * The GetAllStoreCakesUsecase class is decorated with the @Injectable() decorator, which makes it available 
 * for dependency injection throughout the application. The class's purpose is to interact with the 
 * StoreRepository to fetch all cakes that belong to a given store. It is essential for retrieving 
 * cake-related data within the context of a specific store. 
 * The constructor injects the StoreRepository instance, which will be used to perform the operation 
 * of fetching cakes.
 */
@Injectable()
export class GetAllStoreCakesUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}

  /** 
   * Bigburry Hypersystems LLP
   * This is the function that executes the logic to retrieve all cakes for a given store. 
   * The execute method takes in a store_id as a parameter, which is used to identify 
   * the specific store from which cakes should be fetched. It calls the getAllStoreCakes method 
   * from the StoreRepository, which returns all cakes associated with the given store_id. 
   * The function then returns an array of CakeDto objects, which represent the cakes belonging 
   * to the specified store. This method ensures that the correct set of cakes is retrieved 
   * and delivered based on the store identifier passed to it.
   */
  async execute(store_id: string): Promise<Array<CakeDto>> {
    const Cakes = await this.Store.getAllStoreCakes(store_id);
    return Cakes;
  }
}
