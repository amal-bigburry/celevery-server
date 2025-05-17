/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file, 
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * Importing Required Packages
 * Importing decorators, interfaces, DTOs, tokens, entities and config service
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
 * Returns and injectable cake category
 * Use case class to get trending products based on order analysis across levels
 */
@Injectable()
export class GetTrendingProductsUseCase {
  private orders: OrderDto[]; // Stores orders fetched from analysis service
  private cake_occurences = {}; // Tracks count of each cake occurrence across orders
  private occurenceInArray: [string, number][]; // Array representation of cake occurrences for filtering
  private ordersAboveTTV: [string, number][]; // Filtered cakes exceeding minimum quantity threshold
  /**
   * Constructor injects dependencies for fetching orders, cake details and config
   * @param getOrdersToAnalyse - Interface for fetching orders by level
   * @param IGetCakeDetailsUseCase - Interface to fetch cake details by cake ID
   * @param configService - Provides configuration parameters like thresholds and limits
   */
  constructor(
    @Inject(GETORDERANALYSE)
    private readonly getOrdersToAnalyse: IGetOrdersToAnalyse,
    @Inject(CAKEREPOSITORY)
    private readonly IGetCakeDetailsUseCase: IGetCakeDetailsUseCase,
    private readonly configService: ConfigService,
  ) {}
  /**
   * Function that execute the logic
   * Iterates through analysis levels to gather trending cake data meeting thresholds
   * @param page - Page number for pagination
   * @param limit - Items per page for pagination
   * @returns Promise resolving to PaginationDto of trending cakes
   */
  async execute(page, limit): Promise<PaginationDto> {
    /**
     * Trying levels 0 to 6
     * Accumulate cake occurrences and filter based on minimum quantity threshold
     * Break loop if trending cake count surpasses configured maximum
     */
    for (let level = 0; level <= 6; level++) {
      this.orders = await this.getOrdersToAnalyse.execute(level);
      this.orders.forEach((order) => {
        this.cake_occurences[order.cake_id] =
          (this.cake_occurences[order.cake_id] || 0) + 1;
      });
      this.occurenceInArray = Object.entries(this.cake_occurences);
      this.ordersAboveTTV = this.occurenceInArray.filter(
        ([_, count]) => count >= parseInt(this.configService.get<string>('TMQ') || '0'),
      );
      if (this.ordersAboveTTV.length > parseInt(this.configService.get<string>('TTC') || '0')) {
        break;
      }
    }
    return await this.respond(this.ordersAboveTTV, page, limit);
  }
  /**
   * Prepare the paginated response of trending cakes
   * Sorts filtered cakes and fetches detailed cake entities for pagination
   * @param orders - Array of [cake_id, occurrence] tuples filtered by threshold
   * @param page - Current page number for pagination
   * @param limit - Number of items per page
   * @returns Promise resolving to a PaginationDto with paginated trending cake data
   */
  async respond(orders, page, limit): Promise<PaginationDto> {
    // Sort cakes by descending order of occurrences
    const sortedCakes = orders.sort((a, b) => b[1] - a[1]);
    // Slice top trending cakes based on maximum trending cake count configuration
    let topCakeObject = sortedCakes.slice(0, parseInt(this.configService.get<string>('TTC') || '0'));
    // Fetch detailed cake data concurrently for the top trending cakes
    const topCakeDetails: CakeEntity[] = await Promise.all(
      topCakeObject.map((cakeobj) =>
        this.IGetCakeDetailsUseCase.execute(cakeobj[0]),
      ),
    );
    const total = topCakeDetails.length; // Total trending cakes found
    const totalPages = Math.ceil(total / limit); // Calculate total pages for pagination
    const start = (page - 1) * limit; // Start index for slicing
    const end = start + limit; // End index for slicing
    const paginatedData = topCakeDetails.slice(start, end); // Paginated cake data
    // Return paginated response with metadata
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
