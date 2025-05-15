/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';
/**
 * injectable file to store cakes
 */
@Injectable()
export class GetAllStoreCakesUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}
  /**
   * function to execute
   */
  async execute(store_id: string): Promise<Array<CakeDto>> {
    const Cakes = await this.Store.getAllStoreCakes(store_id);
    return Cakes;
  }
}
