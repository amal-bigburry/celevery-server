/**
 * importing the required packages
 */
import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChangeOrderStatusUseCase } from '../../applicationLayer/use-cases/change_order_status.usecase';
import { ChangeOrderStatusDto } from '../../dtos/changeOrderStatus.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import ORDER_STATUS from 'src/common/utils/contants';
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
  @Post('confirm')
  @UseGuards(JwtAuthGuard)
  async change_status_to_confirm(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request:AuthRequest
  ) {
    changeOrderStatusDto.new_status = ORDER_STATUS.WAITINGTOPAY;
    changeOrderStatusDto.user_id = request.user['userId']
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/cancel
   */
  @Post('cancel')
  @UseGuards(JwtAuthGuard)
  async change_status_to_cancel(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest
  ) {
    changeOrderStatusDto.new_status = ORDER_STATUS.CANCELLED;
    changeOrderStatusDto.user_id = request.user['userId']
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/cancel
   */
  @Post('prepairing')
  @UseGuards(JwtAuthGuard)
  async change_status_to_preparing(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest
  ) {
    changeOrderStatusDto.user_id = request.user['userId']
    changeOrderStatusDto.new_status = ORDER_STATUS.PREPAIRING;
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/cancel
   */
  @Post('packed')
  @UseGuards(JwtAuthGuard)
  async change_status_to_packed(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest
  ) {
    changeOrderStatusDto.user_id = request.user['userId']
    changeOrderStatusDto.new_status = ORDER_STATUS.PACKED;
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
  /**
   * route to handle the /order/cancel
   */
  @Post('waitingforpickup')
  @UseGuards(JwtAuthGuard)
  async change_status_to_waitingforpickup(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest
  ) {
    changeOrderStatusDto.user_id = request.user['userId']
    changeOrderStatusDto.new_status = ORDER_STATUS.WAITINGFORPICKUP;
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }

  /**
   * route to handle the /order/cancel
   */
  @Post('delivered')
  @UseGuards(JwtAuthGuard)
  async change_status_to_delivered(
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
    @Req() request: AuthRequest
  ) {
    changeOrderStatusDto.user_id = request.user['userId']
    changeOrderStatusDto.new_status = ORDER_STATUS.DELIVERED;
    return this.changeOrderStatusUseCase.execute(changeOrderStatusDto);
  }
}
