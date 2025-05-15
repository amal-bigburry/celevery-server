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
 * routes post request to  /request_order 
 */
  @Post()
  @UseGuards(JwtAuthGuard)
  async request_order(@Body() orderDto: OrderDto, @Req() request: AuthRequest) {
    orderDto.buyer_id = request.user['userId'];
    orderDto.order_status = ORDER_STATUS.REQUESTED;
    return this.RequestOrderUseCase.execute(orderDto);
  }
}
