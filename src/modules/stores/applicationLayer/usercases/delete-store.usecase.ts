/**
 * Bigburry Hypersystems LLP
 * This section of the code is importing all the necessary modules and packages
 * needed to implement the functionality for deleting a store.
 * The Inject decorator from the @nestjs/common package is used to inject the StoreRepository
 * that handles interactions with the store data. The STORE_REPOSITORY token is imported
 * to enable dependency injection of the store repository. These imports are essential
 * for ensuring that the DeleteStoreUsecase class can perform the required actions
 * related to deleting a store from the platform.
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../interfaces/store.interfaces';
import { STORE_REPOSITORY } from '../../tokens/storeRepository.token';

/**
 * Bigburry Hypersystems LLP
 * This is the injectable service class responsible for deleting a store from the platform.
 * The DeleteStoreUsecase class is decorated with the @Injectable() decorator, making it available
 * for dependency injection throughout the application. This class's primary purpose is to
 * facilitate the deletion of a store via the StoreRepository. The constructor injects the
 * StoreRepository instance to access store-related data and operations.
 */
@Injectable()
export class DeleteStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}

  /**
   * Bigburry Hypersystems LLP
   * This is the main function that performs the logic to delete a store from the platform.
   * The execute method does not take any parameters. It calls the deleteStore method
   * from the StoreRepository, which handles the deletion process.
   * Once the store has been successfully deleted, the function returns the result (order)
   * which indicates the success or failure of the store deletion process.
   * It is important to ensure that this method is used cautiously, as store deletion
   * may have significant implications on the platform's data integrity.
   */
  async execute(store_id: string): Promise<object> {
    try {
      const order = await this.Store.deleteStore(store_id);
      return { status: 'deleted' };
    } catch (error) {
      return { status: 'failed', error: error };
    }
  }
}
