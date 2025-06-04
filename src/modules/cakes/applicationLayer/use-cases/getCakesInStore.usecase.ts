/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing necessary packages and dependencies
 */

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../interfaces/cake.repository';
// import { CAKE_REPOSITORY } from '../../tokens/cakeRepository.token';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CAKE_REPOSITORY } from '../../tokens/cakeRepository.token';
/**
 * Injectable use case class to get details of a cake by its ID
 */
@Injectable()
export class GetCakesInStoreUsecase {
  constructor(
    /**
     * Injecting CakeRepository to access cake data
     */
    @Inject(CAKE_REPOSITORY)
    private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * Executes the retrieval of cake details based on cake ID
   * @param cake_id - The unique identifier of the cake
   * @returns Promise resolving to the CakeEntity if found
   * @throws BadRequestException if the cake is not found
   */
  async execute(store_id: string): Promise<CakeEntity[]> {
    const cakes = await this.CakeRepository.findCakeByStoreId(store_id);
    return cakes;
  }
}
