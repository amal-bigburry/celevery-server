/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CakeRepository } from '../interfaces/cake.repository';
import { CakeDto } from '../../../../common/dtos/cake.dto';
import { CAKE_REPOSITORY } from '../../tokens/cakeRepository.token';
import { CAKE_CATEGORY_REPOSITORY } from '../../tokens/cakeCategoryRepository.token';
import { CakeCategoryRepository } from '../interfaces/cakeCategoryRepository.interface';
import { IGetStoreUseCase } from '../interfaces/getStoreUsecase.interface';
import { GETSTORE } from '../../tokens/getstoreusecase.token';
/**
 * Injectable use case class responsible for creating a cake entity
 */
@Injectable()
export class CreateCakeUseCase {
  constructor(
    /**
     * Injecting CakeRepository for cake related data operations
     */
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
    /**
     * Injecting CakeCategoryRepository for category validation
     */
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
    /**
     * Injecting GetStoreUseCase to validate store existence
     */
    @Inject(GETSTORE)
    private readonly getStoreUsecase: IGetStoreUseCase,
  ) {}
  /**
   * Main execution method to create a cake
   * @param cakeDto - DTO containing cake details
   * @param files - Uploaded files representing cake images
   * @returns Promise resolving with created cake object
   */
  async execute(cakeDto: CakeDto, files:Express.Multer.File[], user_id:string): Promise<{ cake: Object }> {
    let cakeCategoryIdsInThisCake = cakeDto.cake_category_ids;
    /**
     * Validate the provided category IDs exist in the system
     */
    await Promise.all(
      cakeCategoryIdsInThisCake.map(async (cakeCategoryId) => {
        const categoryExists =
          await this.cakeCategoryRepository.findCategoryById(cakeCategoryId);
        if (!categoryExists) {
          throw new UnauthorizedException(
            `Category with ID ${cakeCategoryId} does not exist`,
          );
        }
        return cakeCategoryId;
      }),
    );
    /**
     * Validate the store ID provided in the cake DTO
     */
    let store = await this.getStoreUsecase.execute(cakeDto.store_id);
    if (!store) {
      throw new BadRequestException('Invalid store id');
    }
    if (store.store_owner_id !== user_id){
      throw new BadRequestException("This store does belongs to you. Not Permitted.")
    }
    /**
     * Upload the cake images and get URLs
     */
    let imageUrls = await this.CakeRepository.uploadImage(files);
    cakeDto.cake_image_urls = imageUrls ? imageUrls : [];
    /**
     * Create the cake record in the repository
     */
    let cake = await this.CakeRepository.createcake(cakeDto);
    /**
     * Return the created cake or empty object if creation failed
     */
    return { cake: cake ? cake : {} };
  }
}
