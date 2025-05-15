/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryRepository } from '../repositories/cakecategory.repository';
import { CAKE_CATEGORY_REPOSITORY } from '../tokens/cakeCategoryRepository.token';
/**
 * Make a injectable for finding te cake categories
 */
@Injectable()
export class FindCakeCategoryUseCase {
  constructor(
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
  ) {}
  /**
   * Main function that does the thing
   */
  async execute(): Promise<Array<any>> {
    const cakescategories = await this.cakeCategoryRepository.findAll();
    return cakescategories;
  }
}
