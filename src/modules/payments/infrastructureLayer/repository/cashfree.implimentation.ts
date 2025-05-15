/**
 * importing required packages
 */
import axios from 'axios';
import { PaymentGateway } from 'src/modules/payments/applicationLayer/repository/payment.repository';
import { DtoToGetPaymentSessionId } from 'src/modules/orders/dtos/DtoToGetPaymentSessionId.dto';
import { ConfigService } from '@nestjs/config';
import { DtoToRefund } from '../../Dtos/dtoToRefund.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGetCakeDetailsUseCase } from '../../applicationLayer/interfaces/GetCakeDetailsusecase.interface';
import { IGetUserDetailUseCase } from '../../applicationLayer/interfaces/GetuserDetailsUsecase.interface';
import { GETCAKEDETAILS } from '../../applicationLayer/tokens/getcakedetails.token';
import { GETUSERDETAILS } from '../../applicationLayer/tokens/getuserdetails.token';
import { IGetOrderDetailsUseCaese } from '../../applicationLayer/interfaces/IGetOrderDetailsUseCaese.interface';
import ORDER_STATUS from 'src/common/utils/contants';
import { GETORDERDETAILS } from '../../applicationLayer/tokens/getOrderDetails.token';
/**
 * injectable file of cashfreepayment gateway
 */
@Injectable()
export class CashFreePaymentGatewayImp implements PaymentGateway {
  constructor(
    @Inject(GETCAKEDETAILS)
    private readonly getCakeDetailsUseCase: IGetCakeDetailsUseCase,
    @Inject(GETUSERDETAILS)
    private readonly getUserDetailUseCase: IGetUserDetailUseCase,
    @Inject(GETORDERDETAILS)
    private readonly IGetOrderDetails: IGetOrderDetailsUseCaese,
    private readonly configService: ConfigService,
  ) {}
  /**
   * get sessionid
   */
  async getsessionid(
    DtoToGetPaymentSessionId: DtoToGetPaymentSessionId,
  ): Promise<Object> {
    let cake = await this.getCakeDetailsUseCase.execute(
      DtoToGetPaymentSessionId.cake_id,
    );
    let user = await this.getUserDetailUseCase.execute(
      DtoToGetPaymentSessionId.user_id,
    );
    let order = await this.IGetOrderDetails.execute(
      DtoToGetPaymentSessionId.order_id,
    );
    if (order.order_status === ORDER_STATUS.REQUESTED) {
      throw new BadRequestException('The order is not confirm to pay.');
    } else if (order.order_status === ORDER_STATUS.PAID) {
      throw new BadRequestException('The order is already paid.');
    }
    const orderData = {
      order_id: DtoToGetPaymentSessionId.order_id,
      order_amount: 200,
      order_currency: 'INR',
      customer_details: {
        customer_id: user?._id,
        customer_email: user?.email,
        customer_phone: '+919946658045',
      },
    };
    const response = await axios.post(
      this.configService.get<string>('CASHFREE_API_URL') + '/orders',
      orderData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-version': '2022-09-01',
          'x-client-id': `${this.configService.get<string>('CASHFREE_KEY_ID')}`,
          'x-client-secret': `${this.configService.get<string>('CASHFREE_SECRET_KEY')}`,
        },
      },
    );
    if (response.data?.order_status === 'ACTIVE') {
      return response.data.payment_session_id;
    } else {
      throw new Error(response.data?.message || 'Order creation failed');
    }
  }
  /**
   * refunding function
   */
  async refundPayment(DtoToRefund: DtoToRefund): Promise<string> {
    DtoToRefund.refund_speed = 'STANDARD';
    DtoToRefund.refund_id = `refund_${Date.now()}`;
    const response = await axios.post(
      this.configService.get<string>('CASHFREE_API_URL') +
        `/orders/${DtoToRefund.order_id}/refunds`,
      {
        refund_amount: DtoToRefund.refund_amount,
        refund_id: DtoToRefund.refund_id,
        refund_note: DtoToRefund.refund_note,
        refund_speed: DtoToRefund.refund_speed,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-version': '2022-09-01',
          'x-client-id': `${this.configService.get<string>('CASHFREE_KEY_ID')}`,
          'x-client-secret': `${this.configService.get<string>('CASHFREE_SECRET_KEY')}`,
        },
      },
    );
    return response.data;
  }

  async GetRefundStatus(): Promise<string> {
    return '';
  }

  async splitpayment(): Promise<string> {
    return '';
  }
}
