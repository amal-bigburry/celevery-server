/**
 * importing required packages
 */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { StoreDto } from '../../Dtos/store.dto';
import { STORE_REPOSITORY } from '../tokens/storeRepository.token';
/**
 * injectable file to create store in the platform
 */
@Injectable()
export class CreateStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}
  /**
   * executable function
   */
  async execute(
    storeDto: StoreDto,
    license_file: Express.Multer.File,
    id_proof_file: Express.Multer.File,
  ): Promise<string> {
    let stores: StoreDto[] = await this.Store.getAllStores(
      storeDto.store_owner_id,
    );
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
