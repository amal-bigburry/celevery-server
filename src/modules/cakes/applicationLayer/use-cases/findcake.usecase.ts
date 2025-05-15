/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../repositories/cake.repository';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CAKE_REPOSITORY } from '../tokens/cakeRepository.token';
/**
 * Injectable service file to find cakes
 */
@Injectable()
export class FindCakeUseCase {
  constructor(
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * function that execute the logic
   */
  async execute(page, limit, log, lat): Promise<PaginationDto> {
    const cakes = await this.CakeRepository.findAll(page, limit, log, lat);
    return cakes;
  }
}
