/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file,
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * Importing all the required packages
 * Importing NestJS decorators, use case classes and JWT auth guard middleware
 */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetPopularProductsUseCase } from '../../applicationLayer/usecases/GetPopularProducts.usecase';
import { GetTrendingProductsUseCase } from '../../applicationLayer/usecases/GetTrendingProducts.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { GetStoreLocationsUsecase } from '../../applicationLayer/usecases/GetStoreLocations.usecase';
/**
 * Main route /analytics
 * Defines endpoints for analytics data related to trending and popular products
 */
@Controller('analytics')
export class AnalyticsController {
  /**
   * Constructor injects use case classes for handling trending and popular product data
   * @param getTrendingProducts - Use case to get trending products
   * @param getPopularProducts - Use case to get popular products
   */
  constructor(
    private readonly getTrendingProducts: GetTrendingProductsUseCase,
    private readonly getPopularProducts: GetPopularProductsUseCase,
    private readonly getStoreLocations: GetStoreLocationsUsecase,
  ) {}
  /**
   * GET /analytics/trending
   * Protected route to fetch paginated trending products data
   * Uses JwtAuthGuard to secure the endpoint
   * @param page - Pagination page number, defaults to 1
   * @param limit - Pagination limit per page, defaults to 10
   * @returns Trending products data as paginated response
   */
  @HttpCode(HttpStatus.OK)
  @Get('/trending')
  @UseGuards(JwtAuthGuard)
  async get_trending_products(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.getTrendingProducts.execute(page, limit);
  }
  /**
   * GET /analytics/popular
   * Protected route to fetch paginated popular products data
   * Uses JwtAuthGuard to secure the endpoint
   * @param page - Pagination page number, defaults to 1
   * @param limit - Pagination limit per page, defaults to 10
   * @returns Popular products data as paginated response
   */
  // @HttpCode(HttpStatus.OK)
  // @Get('/popular')
  // @UseGuards(JwtAuthGuard)
  // async get_popular_products(
  //   @Query('page') page = 1,
  //   @Query('limit') limit = 10,
  // ) {
  //   return this.getPopularProducts.execute();
  // }
  // @HttpCode(HttpStatus.OK)
  // @Get('/storelocations')
  // @UseGuards(JwtAuthGuard)
  // async getlocation_ofstores(
  //   @Query('page') page = 1,
  //   @Query('limit') limit = 10,
  // ) {
  //   let res = await this.getStoreLocations.execute(page, limit);
  //   return res;
  // }
}
