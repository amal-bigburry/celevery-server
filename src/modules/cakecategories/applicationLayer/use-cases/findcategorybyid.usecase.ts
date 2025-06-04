/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryRepository } from '../interfaces/cakecategory.repository';
import { CAKE_CATEGORY_REPOSITORY } from '../../tokens/cakeCategoryRepository.token';
import { CakeCategoryDto } from '../../../../common/dtos/cakecategory.dto';
/**
 * Injectable service class for finding cake categories by ID
 */
@Injectable()
export class FindCakeCategoryByIDUseCase {
  /**
   * Injects the cake category repository dependency
   */
  constructor(
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
  ) {}
  /**
   * Executes retrieval of a cake category by its unique ID
   * @param category_id - The unique identifier of the cake category
   * @returns A Promise resolving to the cake category DTO
   */
  async execute(category_id: string): Promise<CakeCategoryDto> {
    // Fetch the cake category from the repository by ID
    const cakescategories = await this.cakeCategoryRepository.findCategoryById(category_id);
    // Return the found cake category data transfer object
    return cakescategories;
  }
}
