/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryDto } from '../../../../common/dtos/cakecategory.dto';
import { CAKECATEGORYINTERFACETOKEN } from '../../tokens/cakeCategoryRepository.token';
import { CakeCategoryInterface } from '../interfaces/cake-category.interface';
/**
 * Returns an injectable service class for creating cake categories
 */
@Injectable()
export class CreateCakeCategoryUseCase {
  /**
   * Injects the cake category repository dependency
   */
  constructor(
    @Inject(CAKECATEGORYINTERFACETOKEN)
    private readonly CakeCategoryInterface: CakeCategoryInterface,
  ) {}
  /**
   * Executes the creation of a cake category with optional image upload
   * @param cakeCategoryDto - Data transfer object containing category details
   * @param file - Optional image file to upload
   * @returns An object containing the created cake category or empty object
   */
  async execute(
    cakeCategoryDto: CakeCategoryDto,
    file,
  ): Promise<{ cake: Object }> {
    //validate and check does this category name already exist
    let existStatus = await this.CakeCategoryInterface.checkifexist(cakeCategoryDto.category_name)
    // Upload the image file and get the URL if available
    let s3Url = await this.CakeCategoryInterface.uploadImage(file);
    // Set the image URL in the DTO, or empty string if none
    cakeCategoryDto.category_image_url = s3Url ? s3Url : '';
    // Create the cake category using the repository
    let cake =
      await this.CakeCategoryInterface.createcakecategory(cakeCategoryDto);
    // Return the created cake category or empty object if creation failed
    return { cake: cake ? cake : {} };
  }
}
