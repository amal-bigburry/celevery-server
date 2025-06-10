/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing necessary packages and dependencies
 */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CakeInterface } from '../interfaces/cake.interface';
// import { CAKE_REPOSITORY } from '../../tokens/cakeRepository.token';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CAKEINTERFACETOKEN } from '../../tokens/cake.token';
/**
 * Injectable use case class to get details of a cake by its ID
 */
@Injectable()
export class GetCakeDetailsUseCase {
  constructor(
    /**
     * Injecting CakeRepository to access cake data
     */
    @Inject(CAKEINTERFACETOKEN)
    private readonly CakeInterface: CakeInterface,
  ) {}
  /**
   * Executes the retrieval of cake details based on cake ID
   * @param cake_id - The unique identifier of the cake
   * @returns Promise resolving to the CakeEntity if found
   * @throws BadRequestException if the cake is not found
   */
  async execute(cake_id: string): Promise<CakeEntity> {
    const cake = await this.CakeInterface.findById(cake_id);
    if (!cake) throw new BadRequestException('Cake not found');
    return cake;
  }
}
