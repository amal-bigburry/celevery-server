/**
 * importing all the required packages
 */
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { GetPopularProductsUseCase } from '../../applicationLayer/usecases/GetPopularProducts.usecase';
import { GetTrendingProductsUseCase } from '../../applicationLayer/usecases/GetTrendingProducts.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
/**
 * Main route /cakecategories
 */
@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly getTrendingProducts: GetTrendingProductsUseCase,
    private readonly getPopularProducts: GetPopularProductsUseCase,
  ) {}
  /**
   * route get request to /cakecategories
   */
  @Get('/trending')
  @UseGuards(JwtAuthGuard)
  async get_trending_products(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.getTrendingProducts.execute(page, limit);
  }
  /**
   * route get request to /cakecategories
   */
  @Get('/popular')
  @UseGuards(JwtAuthGuard)
  async get_popular_products(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.getPopularProducts.execute(page, limit);
  }
}
