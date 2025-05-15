/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { CakeCategoryRepository } from '../../applicationLayer/interfaces/cakeCategoryRepository.interface';
import { FindCakeCategoryByIDUseCase } from 'src/modules/cakecategories/applicationLayer/use-cases/findcategorybyid.usecase';
import { CakeCategoryDto } from 'src/modules/cakecategories/dtos/cakecategory.dto';
/**
 * injectable file
 */
@Injectable()
export class CakecategoryRepositoryImp implements CakeCategoryRepository {
  constructor(
    private readonly findCakeCategoryByIDUseCase: FindCakeCategoryByIDUseCase,
  ) {}
  async findCategoryById(category_id: string): Promise<CakeCategoryDto> {
    return this.findCakeCategoryByIDUseCase.execute(category_id);
  }
}
