/**
 * Bigburry Hypersystems LLP
 * This section of the code is importing all the necessary modules and packages required
 * to implement the functionality for creating a store on the platform.
 * These imports are essential for the operation of the CreateStoreUsecase class.
 * The BadRequestException from the @nestjs/common package is imported to throw
 * specific exceptions in case of invalid requests, such as when a store name already exists.
 * The Inject decorator is used for dependency injection to inject the StoreRepository
 * that handles interactions with the store data. The StoreDto is also imported, which serves
 * as a data transfer object for passing information about the store.
 * The STORE_REPOSITORY token is imported to enable the injection of the StoreRepository
 * via NestJS's dependency injection system.
 */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { StoreDto } from '../../Dtos/store.dto';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';

/**
 * Bigburry Hypersystems LLP
 * This is the injectable service class responsible for creating a new store in the platform.
 * The CreateStoreUsecase class is decorated with @Injectable(), making it available
 * for dependency injection throughout the application.
 * It contains a constructor that injects the StoreRepository instance using the @Inject decorator.
 * The class aims to provide functionality for checking the existence of a store name and
 * creating a new store if the name is unique.
 * This ensures that no two stores can have the same name, and it helps maintain
 * the integrity of the platform's store data.
 */
@Injectable()
export class CreateStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}

  /**
   * Bigburry Hypersystems LLP
   * This is the main function that performs the logic to create a store on the platform.
   * The function takes in a StoreDto object, a license file, and an ID proof file
   * as input parameters. First, it checks if a store already exists with the same
   * name for the given store owner by calling the getAllStores method of the StoreRepository.
   * If a store with the same name is found, it throws a BadRequestException to prevent
   * the creation of duplicate stores. If no store with the same name exists,
   * the function proceeds to create the new store by invoking the createStore method
   * of the StoreRepository, passing the necessary data and files.
   * Finally, the function returns the string 'ok' as a simple indication that the store creation process has succeeded.
   */
  async execute(
    storeDto: StoreDto,
    license_file: Express.Multer.File,
    id_proof_file: Express.Multer.File,
  ): Promise<string> {
    let stores: StoreDto[] = await this.Store.getAllStoreInPlatform();
    let store = stores.find((s) => s.store_name === storeDto.store_name);
    if (store) {
      throw new BadRequestException('Store name already exists');
    }
    const order = await this.Store.createStore(
      storeDto,
      license_file,
      id_proof_file,
    );
    return 'ok';
  }
}
