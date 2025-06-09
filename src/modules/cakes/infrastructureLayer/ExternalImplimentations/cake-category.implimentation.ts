/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { CakeCategoryRepository } from '../../applicationLayer/interfaces/cake-category.interface';
import { FindCakeCategoryByIDUseCase } from 'src/modules/cakecategories/applicationLayer/use-cases/find-category-by-id.usecase';
import { CakeCategoryDto } from 'src/common/dtos/cakecategory.dto';

/**
 * Injectable implementation of the CakeCategoryRepository interface.
 * This class acts as a bridge between the application layer use case
 * and the domain-specific repository interface.
 */
@Injectable()
export class CakecategoryRepositoryImp implements CakeCategoryRepository {
  /**
   * Injects the FindCakeCategoryByIDUseCase which contains the business logic
   * to retrieve cake categories by their ID.
   */
  constructor(
    private readonly findCakeCategoryByIDUseCase: FindCakeCategoryByIDUseCase,
  ) {}

  /**
   * Finds a cake category by its ID by delegating to the use case's execute method.
   * 
   * @param category_id - The ID of the cake category to find
   * @returns A promise that resolves to a CakeCategoryDto object containing the category details
   */
  async findCategoryById(category_id: string): Promise<CakeCategoryDto> {
    return this.findCakeCategoryByIDUseCase.execute(category_id);
  }
}
