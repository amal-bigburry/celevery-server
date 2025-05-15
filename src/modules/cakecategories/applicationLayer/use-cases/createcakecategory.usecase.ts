/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryRepository } from '../repositories/cakecategory.repository';
import { CakeCategoryDto } from '../../dtos/cakecategory.dto';
import { CAKE_CATEGORY_REPOSITORY } from '../tokens/cakeCategoryRepository.token';
/**
 * Returns and injectable cake category
 */
@Injectable()
export class CreateCakeCategoryUseCase {
  constructor(
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
  ) {}
 /**
  * This function does the main part
  */
  async execute(
    cakeCategoryDto: CakeCategoryDto,
    file,
  ): Promise<{ cake: Object }> {
    let s3Url = await this.cakeCategoryRepository.uploadImage(file);
    cakeCategoryDto.category_image_url = s3Url ? s3Url : '';
    let cake =
      await this.cakeCategoryRepository.createcakecategory(cakeCategoryDto);
    return { cake: cake ? cake : {} };
  }
}
