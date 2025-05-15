/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { StoreDto } from '../../Dtos/store.dto';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';
/**
 * injectable file to get the store details
 */
@Injectable()
export class getStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}

  async execute(store_id: string): Promise<StoreDto> {
    const store = await this.Store.getStore(store_id);
    return store;
  }
}
