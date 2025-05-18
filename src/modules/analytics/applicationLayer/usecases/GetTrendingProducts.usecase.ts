/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file, 
 * via any medium is strictly prohibited. Proprietary and confidential.
 */

/**
 * Importing Required Packages
 * This section imports necessary decorators, interfaces, data transfer objects (DTOs), 
 * tokens for dependency injection, domain entities representing cakes and orders, 
 * and configuration service used to access environment variables.
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { IGetOrdersToAnalyse } from '../interfaces/IGetOrdersToAnalyse.interface';
import { IGetCakeDetailsUseCase } from 'src/modules/orders/applicationLayer/interfaces/GetCakeDetailsusecase.interface';
import { GETORDERANALYSE } from '../../tokens/GetOrdersToAnalyse.token';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { CAKEREPOSITORY } from '../../tokens/cake_Repository.token';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
import { ConfigService } from '@nestjs/config';

/**
 * Use case class to get trending products based on order analysis across multiple analysis levels.
 * 
 * This injectable service aggregates cake orders by analyzing orders at multiple levels,
 * counts occurrences of each cake, filters cakes based on a minimum quantity threshold, 
 * and returns paginated results of trending cakes.
 * 
 * It halts further analysis when the number of trending cakes exceeds a configured threshold.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
@Injectable()
export class GetTrendingProductsUseCase {
  /**
   * Stores the list of orders fetched for analysis.
   */
  private orders: OrderDto[];
  /**
   * Tracks the count of each cake's occurrence across all analyzed orders.
   */
  private cake_occurences = {};
  /**
   * Array form of cake occurrences as [cake_id, count] tuples for filtering and sorting.
   */
  private occurenceInArray: [string, number][];
  /**
   * Cakes filtered to only those with counts above the minimum quantity threshold.
   */
  private ordersAboveTTV: [string, number][];

  /**
   * Constructor injects dependencies including interfaces for fetching orders and cake details,
   * as well as the configuration service for accessing environment variables related to thresholds.
   * 
   * @param getOrdersToAnalyse Interface to fetch orders filtered by analysis level.
   * @param IGetCakeDetailsUseCase Interface to retrieve detailed cake information by cake ID.
   * @param configService Provides configuration values such as minimum thresholds and maximum counts.
   */
  constructor(
    @Inject(GETORDERANALYSE)
    private readonly getOrdersToAnalyse: IGetOrdersToAnalyse,
    @Inject(CAKEREPOSITORY)
    private readonly IGetCakeDetailsUseCase: IGetCakeDetailsUseCase,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Executes the use case logic to identify trending cakes:
   * Iterates over analysis levels 0 through 6, accumulating cake occurrences from orders.
   * Filters cakes meeting the configured minimum quantity threshold.
   * Stops iterating once the number of trending cakes exceeds the configured maximum trending count.
   * Returns a paginated list of trending cakes.
   * 
   * @param page Current page number for pagination.
   * @param limit Number of items per page for pagination.
   * @returns Promise resolving to a PaginationDto containing paginated trending cakes data.
   */
  async execute(page, limit): Promise<PaginationDto> {
    /**
     * Loop through levels 0 to 6 to analyze orders and aggregate cake counts.
     */
    for (let level = 0; level <= 6; level++) {
      this.orders = await this.getOrdersToAnalyse.execute(level);
      /**
       * Increment cake occurrence counts based on orders at current level.
       */
      this.orders.forEach((order) => {
        this.cake_occurences[order.cake_id] =
          (this.cake_occurences[order.cake_id] || 0) + 1;
      });
      /**
       * Convert occurrences to array of tuples for filtering.
       */
      this.occurenceInArray = Object.entries(this.cake_occurences);
      /**
       * Filter cakes whose occurrence counts meet or exceed the configured minimum quantity threshold.
       */
      this.ordersAboveTTV = this.occurenceInArray.filter(
        ([_, count]) => count >= parseInt(this.configService.get<string>('TMQ') || '0'),
      );
      /**
       * Break the loop if the number of filtered trending cakes exceeds the configured maximum trending cake count.
       */
      if (this.ordersAboveTTV.length > parseInt(this.configService.get<string>('TTC') || '0')) {
        break;
      }
    }
    /**
     * Return the paginated response of trending cakes.
     */
    return await this.respond(this.ordersAboveTTV, page, limit);
  }

  /**
   * Prepares and returns a paginated response of trending cakes.
   * Sorts the filtered cakes by descending occurrence count,
   * slices the list based on maximum trending cake count configuration,
   * fetches detailed cake entities concurrently,
   * and slices the results for the requested pagination page.
   * 
   * @param orders Array of [cake_id, occurrence_count] tuples filtered by threshold.
   * @param page Current pagination page number.
   * @param limit Number of items per page.
   * @returns Promise resolving to PaginationDto with paginated trending cake data and metadata.
   */
  async respond(orders, page, limit): Promise<PaginationDto> {
    /**
     * Sort cakes descending by their occurrence counts.
     */
    const sortedCakes = orders.sort((a, b) => b[1] - a[1]);
    /**
     * Limit the number of trending cakes to the configured maximum trending cake count.
     */
    let topCakeObject = sortedCakes.slice(0, parseInt(this.configService.get<string>('TTC') || '0'));
    /**
     * Fetch detailed CakeEntity objects for the top trending cakes concurrently.
     */
    const topCakeDetails: CakeEntity[] = await Promise.all(
      topCakeObject.map((cakeobj) =>
        this.IGetCakeDetailsUseCase.execute(cakeobj[0]),
      ),
    );
    /**
     * Calculate the total number of trending cakes found.
     */
    const total = topCakeDetails.length;
    /**
     * Compute total number of pages for pagination based on limit.
     */
    const totalPages = Math.ceil(total / limit);
    /**
     * Calculate start and end indices for slicing paginated results.
     */
    const start = (page - 1) * limit;
    const end = start + limit;
    /**
     * Slice detailed cake data for the requested pagination page.
     */
    const paginatedData = topCakeDetails.slice(start, end);
    /**
     * Return a PaginationDto containing paginated trending cake data and pagination metadata.
     */
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
