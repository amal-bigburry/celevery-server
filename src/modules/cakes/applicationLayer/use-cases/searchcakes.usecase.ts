/**
 * imports the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../repositories/cake.repository';
import { CAKE_REPOSITORY } from '../tokens/cakeRepository.token';
/**
 * Injectable service file to search the cakes
 */
@Injectable()
export class SearchForCakesUseCase {
  constructor(
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  async execute(keyword: string, category_id: string): Promise<Array<any>> {
    const cakes = await this.CakeRepository.find(keyword, category_id);
    return cakes;
  }
}
