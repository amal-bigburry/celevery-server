/**
 * importing required packages
 */
import { Controller, Post, Body, Inject, UseGuards, Req } from '@nestjs/common';
import { GetSessionIdUseCase } from '../../applicationLayer/use-cases/getSessionId.UseCase';
import { RefundUsecase } from '../../applicationLayer/use-cases/refund.usecase';
import { TransferAmountUsecase } from '../../applicationLayer/use-cases/tranfer.usecase';
import ORDER_STATUS from 'src/common/utils/contants';
import { ChangeOrderStatusDto } from 'src/modules/orders/dtos/changeOrderStatus.dto';
import { DtoToGetPaymentSessionId } from 'src/modules/orders/dtos/DtoToGetPaymentSessionId.dto';
import { DtoToRefund } from '../../Dtos/dtoToRefund.dto';
import { IChangeOrderStatusUseCase } from '../../applicationLayer/interfaces/IChangeOrderStatusUseCase.interface';
import { IGetAllPaymentWaitingOrdersUseCase } from '../../applicationLayer/interfaces/IGetAllPaymentWaitingOrdersUseCase.interface';
import { CHANGEORDERSTATUS } from '../../applicationLayer/tokens/changeorderstatus.token';
import { GETPAYMENTWAITINGORDERS } from '../../applicationLayer/tokens/getallpaymentwaiting.token';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
/**
 * route /payments
 */
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly refundPaymentUseCase: RefundUsecase,
    private readonly transferAmountUsecase: TransferAmountUsecase, // Assuming TransferAmountUsecase is also a RefundUsecase for this example

    @Inject(CHANGEORDERSTATUS)
    private readonly changeOrderStatusUseCase: IChangeOrderStatusUseCase, // Assuming TransferAmountUsecase is also a RefundUsecase for this example
    private readonly getSessionIdUseCase: GetSessionIdUseCase, // Assuming TransferAmountUsecase is also a RefundUsecase for this example

    @Inject(GETPAYMENTWAITINGORDERS)
    private readonly getAllPaymentWaitingOrdersUseCase: IGetAllPaymentWaitingOrdersUseCase, // Assuming TransferAmountUsecase is also a RefundUsecase for this example
  ) {}
  /**
   * routes /payments/create-order
   */
  @Post('getsessionid')
  @UseGuards(JwtAuthGuard)
  async getSessionId(
    @Body() DtoToGetPaymentSessionId: DtoToGetPaymentSessionId,
    @Req() request: AuthRequest,
  ) {
    DtoToGetPaymentSessionId.user_id = request.user['userId'];
    const order = await this.getSessionIdUseCase.execute(
      DtoToGetPaymentSessionId,
    );
    return order;
  }
  /**
   * routes /payments/verify-payment
   */
  // @Post('verify-payment')
  // async verifypayment() {
  //   const status = await this.verifyPaymentUseCase.execute();
  //   return status;
  // }
  /**
   * routes /payments/refund-payment
   */
  @Post('refund')
  async Refundpayment(@Body() DtoToRefund: DtoToRefund) {
    const status = await this.refundPaymentUseCase.execute(DtoToRefund);
    return status;
  }
  /**
   * routes /paymetns/transfer
   */
  @Post('transfer')
  async transfer() {
    const status = await this.transferAmountUsecase.execute();
    return status;
  }
  /**
   * routes /payments/status_webhook
   */
  @Post('/status_webhook')
  async status_webhook(@Body() body: any) {
    // console.log('✅ Webhook received:', body);
    let webhook_request_data = body?.data;
    // console.log(webhook_request_data)
    let order_id = webhook_request_data?.order?.order_id;
    // let allOrders:OrderDto[] = []
    let allOrders = await this.getAllPaymentWaitingOrdersUseCase.execute();
    // console.log(allOrders, order_id)
    let validOrder = allOrders.find((order) => order.id === order_id);
    // console.log(validOrder)
    let updatedstatus: ChangeOrderStatusDto = {
      order_id: '',
      new_status: '',
      user_id: '',
    };
    if (validOrder) {
      if (webhook_request_data?.payment?.payment_status == 'SUCCESS') {
        // if (new Date() > new Date(validOrder.)) {
        //   updatedstatus = {
        //     order_id: validOrder.id,
        //     new_status: ORDER_STATUS.CANCELLED,
        //     user_id: validOrder.buyer_id,
        //   };
        // } else {
        updatedstatus = {
          order_id: validOrder.id,
          new_status: ORDER_STATUS.PAID,
          user_id: validOrder.buyer_id,
        };
        // }
      } else if (webhook_request_data.payment.payment_status == 'FAILED') {
        // if (new Date() > new Date(validOrder.ordered_timestamp)) {
        //   updatedstatus = {
        //     order_id: validOrder.order_id,
        //     new_status: ORDER_STATUS.CANCELLED,
        //     user_id: validOrder.buyer_id,
        //   };
        // } else {
        updatedstatus = {
          order_id: validOrder.id,
          new_status: ORDER_STATUS.WAITINGTOPAY,
          user_id: validOrder.buyer_id,
        };
        // }
      } else if (
        webhook_request_data.payment.payment_status == 'USER_DROPPED'
      ) {
        // if (new Date() > new Date(validOrder.ordered_timestamp)) {
        //   updatedstatus = {
        //     order_id: validOrder.order_id,
        //     new_status: ORDER_STATUS.CANCELLED,
        //     user_id: validOrder.buyer_id,
        //   };
        // } else {
        updatedstatus = {
          order_id: validOrder.id,
          new_status: ORDER_STATUS.WAITINGTOPAY,
          user_id: validOrder.buyer_id,
        };
        // }
      }
      console.log(updatedstatus);
      await this.changeOrderStatusUseCase.execute(updatedstatus);
    }
    return { status: 'success' };
  }
}
