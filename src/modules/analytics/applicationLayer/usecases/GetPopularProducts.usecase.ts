/**
 * @fileoverview Use case implementation for retrieving popular products based on order analysis
 * @description
 * This injectable service class is part of Bigburry Hypersystems LLP's application layer
 * and encapsulates the business logic to identify and paginate popular cake products.
 * It leverages injected interfaces to fetch orders for analysis and to retrieve detailed
 * cake information by their identifiers. The class uses configuration parameters to
 * determine limits for processing and paginating popular products.
 * 
 * The service collects order data, counts occurrences of each cake ordered, sorts
 * cakes by popularity, fetches detailed cake entities, and returns paginated results
 * in a PaginationDto structure.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * Importing necessary decorators and types from NestJS and local modules
 * Includes DTOs, tokens for dependency injection, domain entities, and configuration service
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
 * Injectable service class implementing the business use case to get popular products
 * based on order analysis within the system.
 * 
 * This class orchestrates fetching orders to analyze, computing cake occurrence frequencies,
 * retrieving detailed cake data, and returning paginated popular product listings.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
@Injectable()
export class GetPopularProductsUseCase {
  /**
   * Stores the list of orders retrieved for analysis purposes.
   */
  private orders: OrderDto[];
  /**
   * Object that maps cake IDs to the count of their occurrences in the orders.
   */
  private cake_occurences = {};
  /**
   * Array representation of cake occurrences as [cake_id, occurrence_count] tuples, used for sorting.
   */
  private occurenceInArray: [string, number][];
  /**
   * Placeholder array for orders filtered above a certain threshold (not utilized here).
   */
  private ordersAboveTTV: [string, number][];

  /**
   * Constructor to inject required dependencies using tokens and configuration service.
   * 
   * @param getOrdersToAnalyse Interface to fetch orders filtered for analysis.
   * @param IGetCakeDetailsUseCase Interface to retrieve detailed cake data by ID.
   * @param configService Service to access environment and application configuration variables.
   */
  constructor(
    @Inject(GETORDERANALYSE)
    private readonly getOrdersToAnalyse: IGetOrdersToAnalyse,
    @Inject(CAKEREPOSITORY)
    private readonly IGetCakeDetailsUseCase: IGetCakeDetailsUseCase,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Main method executing the use case logic:
   * - Retrieves orders filtered by analysis level.
   * - Counts how many times each cake appears in the orders.
   * - Converts the occurrence map to an array for sorting.
   * - Returns a paginated response of the most popular cakes.
   * 
   * @param page Current pagination page number requested.
   * @param limit Number of items per page for pagination.
   * @returns Promise resolving to PaginationDto containing paginated popular cake data.
   */
  async execute(openStoreCakes:CakeEntity[]): Promise<CakeEntity[]> {
    /**
     * Fetch orders at analysis level 0 as a starting point.
     */
    this.orders = await this.getOrdersToAnalyse.execute(0);
    /**
     * Count occurrences of each cake_id found in the orders.
     */
    this.orders.forEach((order) => {
      this.cake_occurences[order.cake_id] =
        (this.cake_occurences[order.cake_id] || 0) + 1;
    });
    /**
     * Convert the occurrences object to an array of tuples for sorting.
     */
    this.occurenceInArray = Object.entries(this.cake_occurences);
    /**
     * Prepare and return the paginated popular cakes response.
     */
    let popularcakes =  await this.respond(this.occurenceInArray);
    openStoreCakes.filter(availableCake => popularcakes.includes(availableCake) )
    return openStoreCakes
  }

  /**
   * Helper method to build a paginated response of popular cakes.
   * - Sorts cakes by descending popularity count.
   * - Limits the selection based on configured PLC (Popular Limit Count) value.
   * - Fetches detailed CakeEntity objects for the top cakes.
   * - Slices the detailed results according to pagination parameters.
   * - Returns a PaginationDto including paginated data and metadata.
   * 
   * @param orders Array of [cake_id, occurrence_count] tuples representing cake popularity.
   * @param page Current page number requested for pagination.
   * @param limit Number of items per page requested.
   * @returns Promise resolving to a PaginationDto with paginated cake data and metadata.
   */
  async respond(orders): Promise<CakeEntity[]> {
    /**
     * Sort cakes descending by occurrence count to prioritize popular cakes.
     */
    const sortedCakes = orders.sort((a, b) => b[1] - a[1]);
    /**
     * Select top cakes limited by PLC environment configuration or 0 if unset.
     */
    let topCakeObject = sortedCakes.slice(
      0,
      parseInt(this.configService.get<string>('PLC') || '0'),
    );
    /**
     * Concurrently fetch detailed CakeEntity instances for the top cakes.
     */
    const topCakeDetails: CakeEntity[] = await Promise.all(
      topCakeObject.map((cakeobj) =>
        this.IGetCakeDetailsUseCase.execute(cakeobj[0]),
      ),
    );
    /**
     * Return the PaginationDto containing paginated popular cake data and metadata.
     */
    return  topCakeDetails
    
  }
}
