/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages
 */
import { CakeCategoryDto } from 'src/common/dtos/cakecategory.dto';
import { StoreDto } from 'src/common/dtos/store.dto';
import { IGetStoreInterface } from '../interfaces/get-store.interface';
import { Inject } from '@nestjs/common';
import { GETSTORE } from '../../tokens/get-store.token';
/**
 * Interface defining the contract for getting a store by cake category ID
 */
export class IGetStoreUseCase {
  constructor(
    /**
     * Injecting the StoreRepository to perform store-related operations
     */
    @Inject(GETSTORE) // Use the correct token for dependency injection
    private readonly IGetStoreInterface: IGetStoreInterface, // Replace 'any' with the actual type of StoreRepository
  ) {}
  /**
   * Executes the use case to fetch a store based on the cake category ID
   * @param cakeCategoryId - The unique identifier of the cake category
   * @returns A Promise resolving to the StoreDto associated with the category
   */
  async execute(store_id: string): Promise<StoreDto>{
    return  await this.IGetStoreInterface.getstore(store_id);
  }
}
