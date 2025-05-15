/**
 * imports the required packages
 */
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CakeRepository } from '../repositories/cake.repository';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CAKE_REPOSITORY } from '../tokens/cakeRepository.token';
/**
 * INjectable file to get the details of a cake by passing the cake id
 */
@Injectable()
export class GetCakeDetailsUseCase {
  constructor(
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * This is were it executes
   */
  async execute(cake_id: string): Promise<CakeEntity> {
    const cake = await this.CakeRepository.findById(cake_id);
    if (!cake) throw new BadRequestException('Cake not found');
    return cake;
  }
}
