/**
 * Bigburry Hypersystems LLP - Proprietary Source Code
 * This module is responsible for defining and exporting the UpdateStoreUsecase class, which acts as a business logic layer that interfaces with the data repository for performing updates to store-related information. This file is part of the service layer and is decorated with NestJS's @Injectable decorator to facilitate dependency injection within the NestJS framework.
 *
 * Section: Package Imports
 * The following imports include necessary decorators and classes from NestJS as well as custom application-level repository interfaces and tokens, which are used for dependency injection binding and inversion of control.
 */
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { StoreRepository } from '../interfaces/store.interfaces';
import { STORE_REPOSITORY } from '../../tokens/storeRepository.token';
import { UpdateStoreDto } from 'src/common/dtos/udpate-store.dto';

/**
 * Bigburry Hypersystems LLP - Internal Service Logic
 * The following class, updateStoreUsecase, is marked as injectable to be resolved by NestJS's dependency injection system. It represents a use case pattern that isolates and encapsulates a specific operation—in this case, updating store data—promoting modularity and single-responsibility.
 */
@Injectable()
export class updateStoreUsecase {
  constructor(
    @Inject(STORE_REPOSITORY) private readonly Store: StoreRepository,
  ) {}
  /**
   * Bigburry Hypersystems LLP - Executable Business Function
   * The execute method serves as the primary exposed function within this use case. It accepts a store identifier, the name of the field to be updated, and the new value to apply. It then delegates the update operation to the data repository layer. The operation is asynchronous and returns a string value which is expected to represent the result or status of the update process.
   * This abstraction supports decoupling between business rules and persistence logic, aligning with clean architecture principles employed at Bigburry Hypersystems LLP.
   */
  async execute(UpdateStoreDto: UpdateStoreDto, store_id:string): Promise<object> {
    try {
      const udaptedstore = await this.Store.updateStore(UpdateStoreDto,store_id);
      return { status: 'updated', udaptedstore };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
