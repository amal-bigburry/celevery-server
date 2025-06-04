/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages
 */
import { CakeCategoryDto } from 'src/common/dtos/cakecategory.dto';
import { StoreDto } from 'src/common/dtos/store.dto';
/**
 * Interface defining the contract for getting a store by cake category ID
 */
export interface IGetStoreUseCase {
  /**
   * Executes the use case to fetch a store based on the cake category ID
   * @param cakeCategoryId - The unique identifier of the cake category
   * @returns A Promise resolving to the StoreDto associated with the category
   */
  execute(store_id: string): Promise<StoreDto>;
}
