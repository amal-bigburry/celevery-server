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
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { GetStoreLocationsUsecase } from '../../applicationLayer/usecases/get-store-location.interface';
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
    private readonly getStoreLocations: GetStoreLocationsUsecase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/storelocations')
  @UseGuards(JwtAuthGuard)
  async getlocation_ofstores(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    let res = await this.getStoreLocations.execute(page, limit);
    return res;
  }
}
