/**
 * import the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../repositories/cake.repository';
import { CAKE_REPOSITORY } from '../tokens/cakeRepository.token';
/**
 * Injectable service file that help to get the similar cakes
 */
@Injectable()
export class GetSimilarCakesUseCase {
  constructor(
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * execute the function
   */
  async execute(cake_id: string, variant_id: string): Promise<Array<any>> {
    return [];
  }
}
