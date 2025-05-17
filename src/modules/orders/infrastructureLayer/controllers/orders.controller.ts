/**
 * Company License: Bigburry Hypersystems LLP
 */
/**
 * import the required packages
 */
import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { GetAllOrdersPlacedUseCase } from '../../applicationLayer/use-cases/get_all_orders_placed.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { GetAllOrdersReceivedUseCase } from '../../applicationLayer/use-cases/get_all_orders_received.usecase';

/**
 * handles the route to orders_placed
 */
@Controller('order')
export class OrderController {
  constructor(
    private readonly getAllOrdersPlacedUseCase: GetAllOrdersPlacedUseCase,
    private readonly getAllOrdersReceivedUseCase: GetAllOrdersReceivedUseCase,
  ) {}
  /**
   * get all orders that are placed by the buyer
   */
  @Get('/placed')
  @UseGuards(JwtAuthGuard)
  async get_all_placedorders(
    @Req() request: AuthRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    /**
     * returning the placed orders
     */
    return this.getAllOrdersPlacedUseCase.execute(
      request.user['userId'],
      page,
      limit,
    );
  }

  /**
   * get all orders that are received by the seller
   */
  @Get('/received')
  @UseGuards(JwtAuthGuard)
  async get_all_orders(
    @Req() request: AuthRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    /**
     * returning the received orders
     */
    return this.getAllOrdersReceivedUseCase.execute(
      request.user['userId'],
      page,
      limit,
    );
  }
}
