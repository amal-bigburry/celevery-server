/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for the use case
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../interfaces/cake.interface';
import { CAKE_REPOSITORY } from '../../tokens/cake.token';
/**
 * Injectable service class to retrieve similar cakes based on cake and variant IDs
 */
@Injectable()
export class GetSimilarCakesUseCase {
  constructor(
    /**
     * Injecting CakeRepository to access cake data
     */
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * Placeholder execute method intended to find similar cakes
   * @param cake_id - ID of the base cake
   * @param variant_id - ID of the cake variant
   * @returns Promise resolving to an array of similar cakes (currently empty)
   */
  async execute(cake_id: string, variant_id: string): Promise<Array<any>> {
    return [];
  }
}
