import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { CHANGEORDERSTATUS } from '../../tokens/changeorderstatus.token';
import { GETPAYMENTWAITINGORDERS } from '../../tokens/getallpaymentwaiting.token';
import { ChangeOrderStatusInterface } from '../../../../common/interfaces/change-order-status.interface';
import { GetAllPaymentWaitingOrdersInterface } from '../../../../common/interfaces/get-orders-waiting-to-pay.interface';
import { ChangeOrderStatusDto } from 'src/common/dtos/changeOrderStatus.dto';
import { ORDER_STATUS } from 'src/common/utils/contants';

@Injectable()
export class HandleWebhookUsecase {
  constructor(
    @Inject(CHANGEORDERSTATUS)
    private readonly changeOrderStatusUseCase: ChangeOrderStatusInterface,
    @Inject(GETPAYMENTWAITINGORDERS)
    private readonly getAllPaymentWaitingOrdersUseCase: GetAllPaymentWaitingOrdersInterface, // Injecting the payment gateway service for handling refunds
  ) {}

  async execute(body) {
    try {
      // console.log('working')
      let webhook_request_data = body?.data;
      // find what this request is about
      let order_id: string;
      let allOrders = await this.getAllPaymentWaitingOrdersUseCase.execute();
      // console.log(webhook_request_data?.refund);
      if (webhook_request_data?.order !== undefined) {
        order_id = webhook_request_data?.order?.order_id;
      } else if (webhook_request_data?.refund != undefined) {
        order_id = webhook_request_data?.refund?._id;
      }
      // console.log(webhook_request_data)
      let validOrder = allOrders.find((order) => order.id === order_id);
      if (!validOrder) {
        // console.log(validOrder)
        throw new BadGatewayException('This Order is Not a valid order');
      }
      let updatedstatus: ChangeOrderStatusDto = {
        order_id: '',
        new_status: '',
        user_id: '',
      };
      if (validOrder) {
        if (webhook_request_data?.payment?.payment_status == 'SUCCESS') {
          updatedstatus = {
            order_id: validOrder.id,
            new_status: ORDER_STATUS.ORDERED,
            user_id: validOrder.buyer_id,
          };
        } else if (webhook_request_data?.payment?.payment_status == 'FAILED') {
          updatedstatus = {
            order_id: validOrder.id,
            new_status: ORDER_STATUS.WAITING_TO_PAY,
            user_id: validOrder.buyer_id,
          };
        } else if (
          webhook_request_data?.payment?.payment_status == 'USER_DROPPED'
        ) {
          updatedstatus = {
            order_id: validOrder.id,
            new_status: ORDER_STATUS.WAITING_TO_PAY,
            user_id: validOrder.buyer_id,
          };
        } else if (webhook_request_data?.refund?.refund_status == 'SUCCESS') {
          updatedstatus = {
            order_id: validOrder.id,
            new_status: ORDER_STATUS.REFUNDED,
            user_id: validOrder.buyer_id,
          };
        }
        await this.changeOrderStatusUseCase.execute(updatedstatus);
      }
      return { status: 'success' };
    } catch (err){
      console.log(err)
      return err;
    }
  }
}
