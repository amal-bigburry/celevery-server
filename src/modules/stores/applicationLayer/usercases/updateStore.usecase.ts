/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';
/**
 * injectable file to update the store
 */
@Injectable()
export class updateStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}
  /**
   * executable file
   */
  async execute(
    store_id: string,
    field: string,
    value: string,
  ): Promise<string> {
    const order = await this.Store.updateStore(store_id, field, value);
    return order;
  }
}
