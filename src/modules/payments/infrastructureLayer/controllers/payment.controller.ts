/**
 * importing required packages
 *
 * The following imports bring in necessary packages to support the functionality of the PaymentController.
 * The JwtAuthGuard is used for route protection, ensuring that only authenticated users can access payment routes.
 * The services responsible for payment processing, refunding, and transferring amounts are imported to handle
 * the respective use cases efficiently.
 *
 * Company: BigBurry Hypersystems LLP
 */
import {
  Controller,
  Post,
  Body,
  Inject,
  UseGuards,
  Req,
  BadGatewayException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GetSessionIdUseCase } from '../../applicationLayer/use-cases/get-sessionid.usecase';
import { RefundUsecase } from '../../applicationLayer/use-cases/refund.usecase';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { ChangeOrderStatusDto } from 'src/common/dtos/changeOrderStatus.dto';
import { DtoToGetPaymentSessionId } from 'src/common/dtos/DtoToGetPaymentSessionId.dto';
import { DtoToRefund } from '../../../../common/dtos/dtoToRefund.dto';
import { IChangeOrderStatusUseCase } from '../../applicationLayer/interfaces/change-order-status.interface';
import { IGetAllPaymentWaitingOrdersUseCase } from '../../applicationLayer/interfaces/get-orders-waiting-to-pay.interface';
import { CHANGEORDERSTATUS } from '../../tokens/changeorderstatus.token';
import { GETPAYMENTWAITINGORDERS } from '../../tokens/getallpaymentwaiting.token';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
/**
 * PaymentController is responsible for handling payment-related operations in the system.
 * It exposes routes for obtaining a payment session ID, processing refunds, transferring amounts,
 * and receiving payment status updates through webhooks. Each route has specific functionality that
 * integrates with various services for efficient payment management.
 *
 * Company: BigBurry Hypersystems LLP
 */
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly refundPaymentUseCase: RefundUsecase,
    @Inject(CHANGEORDERSTATUS)
    private readonly changeOrderStatusUseCase: IChangeOrderStatusUseCase,
    private readonly getSessionIdUseCase: GetSessionIdUseCase,
    @Inject(GETPAYMENTWAITINGORDERS)
    private readonly getAllPaymentWaitingOrdersUseCase: IGetAllPaymentWaitingOrdersUseCase,
  ) {}
  /**
   * This POST route `/payments/getsessionid` allows the user to retrieve a payment session ID for their order.
   * The route is protected by the JwtAuthGuard, ensuring that only authenticated users can initiate payment operations.
   * The method receives a DTO containing the necessary details of the order and fetches the corresponding session ID
   * from the payment gateway, which is then returned in the response.
   *
   * The method first extracts the `user_id` from the authenticated request and adds it to the DTO before passing
   * it to the `GetSessionIdUseCase`, which communicates with the payment gateway to obtain the session.
   *
   * @param DtoToGetPaymentSessionId DTO containing order details.
   * @param request The request object containing the user’s authentication details.
   * @returns Returns the order with the session ID from the payment gateway.
   *
   * Company: BigBurry Hypersystems LLP
   */
  @HttpCode(HttpStatus.CREATED)
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
   * This POST route `/payments/refund` allows the user to initiate a refund for a given order.
   * The method receives a `DtoToRefund` containing the refund details, including the order ID and refund amount.
   * The `RefundUsecase` handles the refund logic and communicates with the payment system to process the refund.
   * If successful, the method returns a status indicating the outcome of the operation.
   *
   * @param DtoToRefund DTO containing the order ID and refund amount.
   * @returns Returns a status message indicating the outcome of the refund process.
   *
   * Company: BigBurry Hypersystems LLP
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('refund')
  @UseGuards(JwtAuthGuard)
  async Refundpayment(
    @Body() DtoToRefund: DtoToRefund,
    @Req() request: AuthRequest,
  ) {
    DtoToRefund.user_id = request.user['userId'];
    const status = await this.refundPaymentUseCase.execute(DtoToRefund);
    return status;
  }
  /**
   * This POST route `/payments/status_webhook` handles payment status updates sent via webhooks from the payment gateway.
   * Upon receiving the webhook data, the controller processes the payment status and updates the corresponding order status accordingly.
   * The method checks if the payment status is either `SUCCESS`, `FAILED`, or `USER_DROPPED`, and updates the order status to
   * `PAID` or `WAITINGTOPAY` based on the payment outcome.
   * If a valid order is found, it triggers the `ChangeOrderStatusUseCase` to update the order status in the system.
   *
   * @param body The body of the webhook request containing payment status details.
   * @returns Returns a success response once the order status has been updated.
   *
   * Company: BigBurry Hypersystems LLP
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('status_webhook')
  async status_webhook(@Body() body: any) {
    // console.log('working')
    let webhook_request_data = body?.data;
    // find what this request is about
    let _id: string;
    let allOrders = await this.getAllPaymentWaitingOrdersUseCase.execute();
    // console.log(webhook_request_data?.refund);
    if (webhook_request_data?.order !== undefined) {
      _id = webhook_request_data?.order?._id;
    } else if (webhook_request_data?.refund != undefined) {
      _id = webhook_request_data?.refund?._id;
    }
    // console.log(webhook_request_data)
    let validOrder = allOrders.find((order) => order.id === _id);
    if (!validOrder) {
      console.log(validOrder)
      throw new BadGatewayException('This Order is Not a valid order');
    }
    let updatedstatus: ChangeOrderStatusDto = {
      _id: '',
      new_status: '',
      user_id: '',
    };
    if (validOrder) {
      if (webhook_request_data?.payment?.payment_status == 'SUCCESS') {
        updatedstatus = {
          _id: validOrder.id,
          new_status: ORDER_STATUS.ORDERED,
          user_id: validOrder.buyer_id,
        };
      } else if (webhook_request_data?.payment?.payment_status == 'FAILED') {
        updatedstatus = {
          _id: validOrder.id,
          new_status: ORDER_STATUS.WAITING_TO_PAY,
          user_id: validOrder.buyer_id,
        };
      } else if (
        webhook_request_data?.payment?.payment_status == 'USER_DROPPED'
      ) {
        updatedstatus = {
          _id: validOrder.id,
          new_status: ORDER_STATUS.WAITING_TO_PAY,
          user_id: validOrder.buyer_id,
        };
      } else if (webhook_request_data?.refund?.refund_status == 'SUCCESS') {
        updatedstatus = {
          _id: validOrder.id,
          new_status: ORDER_STATUS.REFUNDED,
          user_id: validOrder.buyer_id,
        };
      }
      await this.changeOrderStatusUseCase.execute(updatedstatus);
    }
    return { status: 'success' };
  }
}
