/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for the use case
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../interfaces/cake.repository';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CAKE_REPOSITORY } from '../../tokens/cakeRepository.token';
import { GetPopularCakes } from 'src/common/utils/getPopularCakes';
import { GetTrendingCakes } from 'src/common/utils/getTrendingCakes';
import { CakeMinimalModel } from '../../infrastructureLayer/models/cakeMinimalData.model';
import { GETSTORE } from '../../tokens/getstoreusecase.token';
import { IGetStoreUseCase } from '../interfaces/getStoreUsecase.interface';
import { GetAllOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_orders.usecase';
import { GetCakeDetailsUseCase } from './GetCakeDetailsUseCase';
import { IGetAllOrdersUseCase } from '../interfaces/getallorders.interface';
import { GET_ALL_ORDERS } from '../../tokens/getAllOrder.token';
/**
 * Injectable service class responsible for finding cakes with pagination and location filters
 */
@Injectable()
export class FindCakeUseCase {
  constructor(
    /**
     * Injecting CakeRepository to access cake data
     */
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
    @Inject(GETSTORE) private readonly getstoreUsecase: IGetStoreUseCase,
    @Inject(GET_ALL_ORDERS)
    private readonly getAllOrdersUseCase: IGetAllOrdersUseCase,
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
    page: number,
    limit: number,
    log: number,
    lat: number,
    knownfor: string[],
    sortby: string,
    orderby: string,
  ): Promise<PaginationDto> {
    let openStoreCakes = await this.CakeRepository.findCakesFromOpenStore();
    let allorders = await this.getAllOrdersUseCase.execute();
    // known for filtering layer
    if (knownfor.length > 0) {
      openStoreCakes = openStoreCakes.filter((cake) =>
        knownfor.includes(cake.known_for),
      );
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
    let cakeMinimalViewModel = new CakeMinimalModel(
      openStoreCakes,
      this.getstoreUsecase,
      lat,
      log,
    );
    let finalcakedata = await cakeMinimalViewModel.toJson();
    // ordering
    finalcakedata.sort((a, b) => a.distance - b.distance);
    // pagination logic
    const total = finalcakedata.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = finalcakedata.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
