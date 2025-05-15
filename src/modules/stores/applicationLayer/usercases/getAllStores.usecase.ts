/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';
/**
 * injectagle function
 */
@Injectable()
export class GetAllStoreUseCase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}
  /**
   * executable function
   */
  async execute(owner_id: string): Promise<Array<object | null>> {
    const stores = await this.Store.getAllStores(owner_id);
    return stores;
  }
}
