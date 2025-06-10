/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for the use case
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeInterface } from '../interfaces/cake.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CAKEINTERFACETOKEN } from '../../tokens/cake.token';
import { GetPopularCakes } from 'src/common/utils/getPopularCakes';
import { GetTrendingCakes } from 'src/common/utils/getTrendingCakes';
import { CakeMinimalModel } from './cake-minimal-data.model';
import { GETALLORDERSTOKEN } from '../../tokens/get-all-orders.token';
import { GetAllOrdersInterface } from '../interfaces/get-all-orders.interface';
/**
 * Injectable service class responsible for finding cakes with pagination and location filters
 */
@Injectable()
export class FindCakeUseCase {
  constructor(
    /**
     * Injecting CakeRepository to access cake data
     */
    @Inject(CAKEINTERFACETOKEN) private readonly CakeInterface: CakeInterface,
    @Inject(GETALLORDERSTOKEN)
    
    private readonly GetAllOrdersInterface: GetAllOrdersInterface,
    private readonly CakeMinimalModel: CakeMinimalModel,
  ) {}
  /**
   * Executes the find operation with pagination and optional location parameters
   * @param page - Page number for pagination
   * @param limit - Number of items per page
   * @param log - Longitude coordinate for filtering by location
   * @param lat - Latitude coordinate for filtering by location
   * @returns Promise resolving to a PaginationDto containing cake results
   */
  async execute(
    log: number,
    lat: number,
    knownfor: string[],
    sortby: string,
    orderby: string,
    category_id: string,
    user_id:string,
  ): Promise<object[]> {
    let openStoreCakes = await this.CakeInterface.findAvailableCakes(user_id);
    // console.log('open store cakes', openStoreCakes.length);
    let allorders = await this.GetAllOrdersInterface.getallorders();
    // known for filtering layer
    if (knownfor.length > 0) {
      openStoreCakes = openStoreCakes.filter((cake) =>
        knownfor.includes(cake.known_for),
      );
    }
    if (category_id) {
      openStoreCakes = openStoreCakes.filter((cake) =>
        cake.cake_category_ids.includes(category_id),
      );
      // console.log('filtered')
    }
    // popular filter layer
    if (sortby === 'popular') {
      openStoreCakes = await GetPopularCakes(
        openStoreCakes,
        allorders,
        orderby,
      );
    }
    // trending filter layer
    else if (sortby === 'trending') {
      openStoreCakes = await GetTrendingCakes(
        openStoreCakes,
        allorders,
        orderby,
      );
    }
    // transform cake data to minimal view model
    let cakeMinimalViewModel = await this.CakeMinimalModel.toJson(
      openStoreCakes,
      lat,
      log,
    );
    // console.log('cakeMinimalViewModel', cakeMinimalViewModel);
    // let finalcakedata = await cakeMinimalViewModel.toJson(openStoreCakes, lat, log);
    // ordering
    cakeMinimalViewModel.sort((a, b) => a.distance - b.distance);
   
    return cakeMinimalViewModel
  }
}
