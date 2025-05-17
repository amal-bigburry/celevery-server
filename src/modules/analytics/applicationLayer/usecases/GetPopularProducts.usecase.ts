/**
 * Importing Required Packages
 * Importing necessary decorators, interfaces, DTOs, tokens, and entities for the use case
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
 * Returns an injectable cake category
 * Use case class to get popular products based on order analysis
 */
@Injectable()
export class GetPopularProductsUseCase {
  private orders: OrderDto[]; // Holds list of orders retrieved for analysis
  private cake_occurences = {}; // Object to count occurrences of each cake_id in orders
  private occurenceInArray: [string, number][]; // Array form of cake occurrences for sorting
  private ordersAboveTTV: [string, number][]; // Placeholder for further filtered orders (not used here)
  /**
   * Constructor injects dependencies via tokens and config service
   * @param getOrdersToAnalyse - Interface to fetch orders for analysis
   * @param IGetCakeDetailsUseCase - Interface to fetch cake details by ID
   * @param configService - Service to access configuration variables
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
   * Retrieves orders, counts cake occurrences, and returns paginated popular cakes
   * @param page - Current page number for pagination
   * @param limit - Number of items per page
   * @returns Promise resolving to a PaginationDto containing popular cake data
   */
  async execute(page, limit): Promise<PaginationDto> {
    /**
     * Trying level 1
     * Fetch orders with analysis level 0
     */
    this.orders = await this.getOrdersToAnalyse.execute(0);
    // Count how many times each cake_id appears in the orders
    this.orders.forEach((order) => {
      this.cake_occurences[order.cake_id] =
        (this.cake_occurences[order.cake_id] || 0) + 1;
    });
    // Convert occurrences object into an array for sorting
    this.occurenceInArray = Object.entries(this.cake_occurences);
    // Return paginated response with cake details
    return await this.respond(this.occurenceInArray, page, limit);
  }
  /**
   * Prepare the paginated response of popular cakes
   * Sorts cakes by popularity and retrieves detailed information for top cakes
   * @param orders - Array of [cake_id, occurrence] tuples
   * @param page - Current page number for pagination
   * @param limit - Number of items per page
   * @returns Promise resolving to a PaginationDto with paginated cake data
   */
  async respond(orders, page, limit): Promise<PaginationDto> {
    // Sort cakes in descending order by occurrence count
    const sortedCakes = orders.sort((a, b) => b[1] - a[1]);
    // Slice the top cakes based on configured limit from environment variables
    let topCakeObject = sortedCakes.slice(
      0,
      parseInt(this.configService.get<string>('PLC') || '0'),
    );
    // Fetch detailed cake entities for the top cakes concurrently
    const topCakeDetails: CakeEntity[] = await Promise.all(
      topCakeObject.map((cakeobj) =>
        this.IGetCakeDetailsUseCase.execute(cakeobj[0]),
      ),
    );
    const total = topCakeDetails.length; // Total number of popular cakes found
    const totalPages = Math.ceil(total / limit); // Total pages for pagination
    const start = (page - 1) * limit; // Calculate slice start index
    const end = start + limit; // Calculate slice end index
    const paginatedData = topCakeDetails.slice(start, end); // Get paginated cake data
    // Return pagination DTO with paginated popular cake data and metadata
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
