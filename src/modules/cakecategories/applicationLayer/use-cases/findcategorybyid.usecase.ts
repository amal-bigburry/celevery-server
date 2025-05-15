/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryRepository } from '../repositories/cakecategory.repository';
import { CAKE_CATEGORY_REPOSITORY } from '../tokens/cakeCategoryRepository.token';
import { CakeCategoryDto } from '../../dtos/cakecategory.dto';
/**
 * Make a injectable for finding te cake categories
 */
@Injectable()
export class FindCakeCategoryByIDUseCase {
  constructor(
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
  ) {}
  /**
   * Main function that does the thing
   */
  async execute(category_id:string): Promise<CakeCategoryDto> {
    const cakescategories = await this.cakeCategoryRepository.findCategoryById(category_id);
    return cakescategories;
  }
}
