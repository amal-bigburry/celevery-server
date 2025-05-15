/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';
/**
 * injectable file for deleting stores
 */
@Injectable()
export class DeleteStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}

  async execute(): Promise<string> {
    const order = await this.Store.deleteStore();
    return order;
  }
}
