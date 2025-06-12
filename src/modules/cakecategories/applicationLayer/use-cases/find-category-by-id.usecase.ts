/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryInterface } from '../interfaces/cake-category.interface';
import { CAKECATEGORYINTERFACETOKEN } from '../../tokens/cakeCategoryRepository.token';
import { CakeCategoryDto } from '../../../../common/dtos/cakecategory.dto';
import { CakeCategoryUsecaseInterface } from 'src/common/interfaces/cake-category.interface';
/**
 * Injectable service class for finding cake categories by ID
 */
@Injectable()
export class FindCakeCategoryByIDUseCase implements CakeCategoryUsecaseInterface{
  /**
   * Injects the cake category repository dependency
   */
  constructor(
    @Inject(CAKECATEGORYINTERFACETOKEN)
    private readonly CakeCategoryInterface: CakeCategoryInterface,
  ) {}
  /**
   * Executes retrieval of a cake category by its unique ID
   * @param category_id - The unique identifier of the cake category
   * @returns A Promise resolving to the cake category DTO
   */
  async execute(category_id: string): Promise<CakeCategoryDto> {
    // Fetch the cake category from the repository by ID
    const cakescategories = await this.CakeCategoryInterface.findCategoryById(category_id);
    // Return the found cake category data transfer object
    return cakescategories;
  }
}
