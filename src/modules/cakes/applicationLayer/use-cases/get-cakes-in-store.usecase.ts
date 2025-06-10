/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing necessary packages and dependencies
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeInterface } from '../interfaces/cake.interface';
import { CAKEINTERFACETOKEN } from '../../tokens/cake.token';
import { CakeMinimalModel } from './cake-minimal-data.model';
/**
 * Injectable use case class to get details of a cake by its ID
 */
@Injectable()
export class GetCakesInStoreUsecase {
  constructor(
    /**
     * Injecting CakeRepository to access cake data
     */
    @Inject(CAKEINTERFACETOKEN)
    private readonly CakeInterface: CakeInterface,
    private readonly CakeMinimalModel: CakeMinimalModel,
  ) {}
  /**
   * Executes the retrieval of cake details based on cake ID
   * @param cake_id - The unique identifier of the cake
   * @returns Promise resolving to the CakeEntity if found
   * @throws BadRequestException if the cake is not found
   */
  async execute(store_id: string): Promise<object[]> {
    const cakes = await this.CakeInterface.findCakeByStoreId(store_id);
    let cakeMinimalViewModel = await this.CakeMinimalModel.toJson(cakes, 0, 0);
    return cakeMinimalViewModel;
  }
}
