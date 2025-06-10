/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for cake search functionality
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeInterface } from '../interfaces/cake.interface';
import { CAKEINTERFACETOKEN } from '../../tokens/cake.token';
import { CakeMinimalModel } from './cake-minimal-data.model';
/**
 * Injectable use case class to search cakes by keyword and category
 */
@Injectable()
export class SearchForCakesUseCase {
  constructor(
    /**
     * Injecting CakeRepository to perform search operations
     */
    @Inject(CAKEINTERFACETOKEN) private readonly CakeInterface: CakeInterface,
    private readonly CakeMinimalModel: CakeMinimalModel,
  ) {}
  /**
   * Executes the search based on keyword and category ID
   * @param keyword - Search keyword for cakes
   * @param category_id - Category ID to filter cakes
   * @returns Promise resolving to an array of matching cakes
   */
  async execute(
    keyword: string,
    category_id: string,
    log: number,
    lat: number,
    user_id:string,
  ): Promise<Array<any>> {
    const cakes = await this.CakeInterface.find(
      keyword,
      category_id,
      log,
      lat,
      user_id,
    );
    let cakeMinimalViewModel = await this.CakeMinimalModel.toJson(
      cakes,
      log,
      lat,
    );
    // let finalcakedata = await cakeMinimalViewModel.toJson();
    return cakeMinimalViewModel;
    // return cakes;
  }
}
