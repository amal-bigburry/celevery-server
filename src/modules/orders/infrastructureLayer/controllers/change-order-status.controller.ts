/**
 * Company License: Bigburry Hypersystems LLP
 */
/**
 * importing the required packages
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChangeOrderStatusUseCase } from '../../applicationLayer/use-cases/change-order-status.usecase';
import { ChangeOrderStatusDto } from '../../../../common/dtos/changeOrderStatus.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { AuthRequest } from 'src/middlewares/AuthRequest';

/**
 * route to handle the /order
 */
@Controller('order')
export class ChangeOrderStatus {
  constructor(
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
  ) {}
  /**
   * route to handle the confirm event of order/confirm
   */
  @HttpCode(HttpStatus.OK)
  @Put('confirm')
  @UseGuards(JwtAuthGuard)
  async change_status_to_confirm(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest,
  ) {
    /**
     * setting the new order status to WAITINGTOPAY
     */
    changeOrderStatusDto.new_status = ORDER_STATUS.WAITING_TO_PAY;
    /**
     * assigning user id from the request
     */
    changeOrderStatusDto.user_id = request.user['userId'];
    /**
     * executing the use case to change order status
     */
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/cancel
   */
  @HttpCode(HttpStatus.OK)
  @Put('cancel')
  @UseGuards(JwtAuthGuard)
  async change_status_to_cancel(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest,
  ) {
    /**
     * setting the new order status to CANCELLED
     */
    changeOrderStatusDto.new_status = ORDER_STATUS.CANCELLED;
    /**
     * assigning user id from the request
     */
    changeOrderStatusDto.user_id = request.user['userId'];
    /**
     * executing the use case to change order status
     */
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/preparing
   */
  @HttpCode(HttpStatus.OK)
  @Put('preparing')
  @UseGuards(JwtAuthGuard)
  async change_status_to_preparing(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest,
  ) {
    /**
     * assigning user id from the request
     */
    changeOrderStatusDto.user_id = request.user['userId'];
    /**
     * setting the new order status to PREPAIRING
     */
    changeOrderStatusDto.new_status = ORDER_STATUS.PREPARING;
    /**
     * executing the use case to change order status
     */
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/packed
   */
  @HttpCode(HttpStatus.OK)
  @Put('packed')
  @UseGuards(JwtAuthGuard)
  async change_status_to_packed(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest,
  ) {
    /**
     * assigning user id from the request
     */
    changeOrderStatusDto.user_id = request.user['userId'];
    /**
     * setting the new order status to PACKED
     */
    changeOrderStatusDto.new_status = ORDER_STATUS.PACKED;
    /**
     * executing the use case to change order status
     */
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/waitingforpickup
   */
  @HttpCode(HttpStatus.OK)
  @Put('waitingforpickup')
  @UseGuards(JwtAuthGuard)
  async change_status_to_waitingforpickup(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest,
  ) {
    /**
     * assigning user id from the request
     */
    changeOrderStatusDto.user_id = request.user['userId'];
    /**
     * setting the new order status to WAITINGFORPICKUP
     */
    changeOrderStatusDto.new_status = ORDER_STATUS.WAITING_FOR_PICKUP;
    /**
     * executing the use case to change order status
     */
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }

  /**
   * route to handle the /order/delivered
   */
  @HttpCode(HttpStatus.OK)
  @Put('delivered')
  @UseGuards(JwtAuthGuard)
  async change_status_to_delivered(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest,
  ) {
    /**
     * assigning user id from the request
     */
    changeOrderStatusDto.user_id = request.user['userId'];
    /**
     * setting the new order status to DELIVERED
     */
    changeOrderStatusDto.new_status = ORDER_STATUS.DELIVERED;
    /**
     * executing the use case to change order status
     */
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }  /**
   * route to handle the /order/delivered
   */
  @HttpCode(HttpStatus.OK)
  @Put('ordered')
  @UseGuards(JwtAuthGuard)
  async change_status_to_paid(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest,
  ) {
    /**
     * assigning user id from the request
     */
    changeOrderStatusDto.user_id = request.user['userId'];
    /**
     * setting the new order status to DELIVERED
     */
    changeOrderStatusDto.new_status = ORDER_STATUS.ORDERED;
    /**
     * executing the use case to change order status
     */
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
}
