/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This controller handles the routes related to order requests.
 * It provides functionality for creating new orders by placing a request.
 * The routes require authentication using JWT tokens to ensure secure access.
 * The main operations include requesting an order and assigning the status to 'REQUESTED' by the buyer.
 * The controller interacts with the RequestOrderUseCase for business logic related to order requests.
 */
/**
 * imports required packages
 */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderDto } from '../../dtos/Order.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { RequestOrderUseCase } from 'src/modules/orders/applicationLayer/use-cases/request_order.usercase';
import ORDER_STATUS from 'src/common/utils/contants';

/**
 * routes get request to /request_order
 */
@Controller('request_order')
export class RequestOrderController {
  constructor(private readonly RequestOrderUseCase: RequestOrderUseCase) {}

  /**
   * This route handles the POST request to initiate a new order.
   * The buyer's user ID is attached to the order, and the status is set to "REQUESTED".
   * It then calls the RequestOrderUseCase to execute the order creation process.
   */
  @Post()
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
