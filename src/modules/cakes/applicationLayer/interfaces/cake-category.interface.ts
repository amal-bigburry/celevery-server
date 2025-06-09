/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages
 */
import { CakeCategoryDto } from 'src/common/dtos/cakecategory.dto';
/**
 * Interface defining the Cake Category Repository contract
 */
export interface CakeCategoryRepository {
  /**
   * Finds a cake category by its unique identifier
   * @param cakeCategoryId - The ID of the cake category to find
   * @returns A Promise resolving to the CakeCategoryDto of the found category
   */
  findCategoryById(cakeCategoryId: string): Promise<CakeCategoryDto>;
}
