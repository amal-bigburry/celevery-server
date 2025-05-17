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
export class UpdateKnownFor {
  constructor(
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  async execute(cake_id: string, known_for: string): Promise<string> {
    await this.CakeRepository.updateKnownfor(cake_id, known_for);
    return 'updated';
  }
}
