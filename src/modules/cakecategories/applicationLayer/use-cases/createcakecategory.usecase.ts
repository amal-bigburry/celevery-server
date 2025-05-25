/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryDto } from '../../dtos/cakecategory.dto';
import { CAKE_CATEGORY_REPOSITORY } from '../../tokens/cakeCategoryRepository.token';
import { CakeCategoryRepository } from '../interfaces/cakecategory.repository';
/**
 * Returns an injectable service class for creating cake categories
 */
@Injectable()
export class CreateCakeCategoryUseCase {
  /**
   * Injects the cake category repository dependency
   */
  constructor(
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
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
    let existStatus = await this.cakeCategoryRepository.checkifexist(cakeCategoryDto.category_name)
    // Upload the image file and get the URL if available
    let s3Url = await this.cakeCategoryRepository.uploadImage(file);
    // Set the image URL in the DTO, or empty string if none
    cakeCategoryDto.category_image_url = s3Url ? s3Url : '';
    // Create the cake category using the repository
    let cake =
      await this.cakeCategoryRepository.createcakecategory(cakeCategoryDto);
    // Return the created cake category or empty object if creation failed
    return { cake: cake ? cake : {} };
  }
}
