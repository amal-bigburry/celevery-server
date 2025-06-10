/**
 * Company License: Bigburry Hypersystems LLP
 */
/**
 * import the required packages
 */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetAllOrdersPlacedUseCase } from '../../applicationLayer/use-cases/get-all-orders-placed.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { GetAllOrdersReceivedUseCase } from '../../applicationLayer/use-cases/get-all-orders-received.usecase';
import { OrderDto } from '../../../../common/dtos/Order.dto';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { RequestOrderUseCase } from '../../applicationLayer/use-cases/request-order.usercase';
import { GetOrderDetailsUseCase } from '../../applicationLayer/use-cases/get_order_details.usecase';
/**
 * handles the route to orders_placed
 */
@Controller('order')
export class OrderController {
  constructor(
    private readonly getAllOrdersPlacedUseCase: GetAllOrdersPlacedUseCase,
    private readonly getAllOrdersReceivedUseCase: GetAllOrdersReceivedUseCase,
    private readonly RequestOrderUseCase: RequestOrderUseCase,
    private readonly getOrderDetails: GetOrderDetailsUseCase,
  ) {}
  /**
   * get all orders that are placed by the buyer
   */
  @HttpCode(HttpStatus.OK)
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
    let data = await this.getAllOrdersPlacedUseCase.execute(
      request.user['userId'],
    );
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
  /**
   * get all orders that are received by the seller
   */
  @HttpCode(HttpStatus.OK)
  @Get('/received/:store_id')
  @UseGuards(JwtAuthGuard)
  async get_all_orders(
    @Req() request: AuthRequest,
    @Query('page') page: number=1,
    @Query('limit') limit: number=10, 
    @Param('store_id') store_id: string,
  ) {
    /**
     * returning the received orders
     */
    if(!store_id){
      throw new BadRequestException('store_id is required')
    }
    let data = await this.getAllOrdersReceivedUseCase.execute(
      request.user['userId'],
      store_id,
    );
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }


  @HttpCode(HttpStatus.OK)
  @Get(':_id')
  @UseGuards(JwtAuthGuard)
  async get_order_detail(
    @Req() request: AuthRequest,
    @Param('_id') _id: string,
  ) {
    return this.getOrderDetails.execute(_id);
  }
  
  @HttpCode(HttpStatus.CREATED)
  @Post('request')
  @UseGuards(JwtAuthGuard)
  async request_order(@Body() orderDto: OrderDto, @Req() request: AuthRequest) {
    /**
     * Assigning the user ID from the authenticated request to the orderDto object.
     * This is crucial to identify the buyer placing the order.
     */
    orderDto.buyer_id = request.user['userId'];
    /**
     * Setting the initial order status to 'REQUESTED'.
     * This marks the order as a pending request.
     */
    orderDto.order_status = ORDER_STATUS.REQUESTED;
    /**
     * Executing the use case to process the order request.
     * The business logic for order creation is handled by the RequestOrderUseCase.
     */
    return this.RequestOrderUseCase.execute(orderDto);
  }
}
