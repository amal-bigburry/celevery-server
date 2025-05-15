import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../repositories/cake.repository';
import { CakeDto } from '../../dtos/cake.dto';
import { CAKE_REPOSITORY } from '../tokens/cakeRepository.token';
import { CAKE_CATEGORY_REPOSITORY } from '../tokens/cakeCategoryRepository.token';
import { CakeCategoryRepository } from '../interfaces/cakeCategoryRepository.interface';
import { IGetStoreUseCase } from '../interfaces/getStoreUsecase.interface';
import { GETSTORE } from '../tokens/getstoreusecase.token';

@Injectable()
export class CreateCakeUseCase {
  constructor(
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
    @Inject(GETSTORE)
    private readonly getStoreUsecase: IGetStoreUseCase,
  ) {}
  /**
   * executing function
   */
  async execute(cakeDto: CakeDto, files): Promise<{ cake: Object }> {
    let cakeCategoryIdsInThisCake = cakeDto.cake_category_ids;
    /**
     * Validate the provided category ids exist
     */
    await Promise.all(
      cakeCategoryIdsInThisCake.map(async (cakeCategoryId) => {
        const categoryExists =
          await this.cakeCategoryRepository.findCategoryById(cakeCategoryId);
        if (!categoryExists) {
          throw new BadRequestException(
            `Category with ID ${cakeCategoryId} does not exist`,
          );
        }
        return cakeCategoryId;
      }),
    );
    let store = await this.getStoreUsecase.execute(cakeDto.store_id);
    if (!store) {
      throw new BadRequestException('Invalid store id');
    }
    /**
     * Uploads the images of cake and returns the image urls
     */
    // console.log('uploading', files)
    let imageUrls = await this.CakeRepository.uploadImage(files);
    // console.log('url', imageUrls)
    cakeDto.cake_image_urls = imageUrls ? imageUrls : [];
    /**
     * Now its time to create a cake document
     */
    let cake = await this.CakeRepository.createcake(cakeDto);
    return { cake: cake ? cake : {} };
  }
}
