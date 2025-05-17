/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for cake search functionality
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../repositories/cake.repository';
import { CAKE_REPOSITORY } from '../tokens/cakeRepository.token';
/**
 * Injectable use case class to search cakes by keyword and category
 */
@Injectable()
export class SearchForCakesUseCase {
  constructor(
    /**
     * Injecting CakeRepository to perform search operations
     */
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * Executes the search based on keyword and category ID
   * @param keyword - Search keyword for cakes
   * @param category_id - Category ID to filter cakes
   * @returns Promise resolving to an array of matching cakes
   */
  async execute(keyword: string, category_id: string): Promise<Array<any>> {
    const cakes = await this.CakeRepository.find(keyword, category_id);
    return cakes;
  }
}
