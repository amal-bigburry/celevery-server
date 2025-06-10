/**
 * importing required packages
 *
 * This section imports essential packages and modules used to implement the functionality of a payment gateway system.
 * The `axios` library is used for making HTTP requests to external APIs, specifically for interacting with the CashFree payment gateway.
 * The `PaymentGateway` interface is implemented to define the structure and contract for the payment gateway operations.
 * The `DtoToGetPaymentSessionId` is a Data Transfer Object (DTO) that holds the necessary information for initiating a payment session.
 * The `ConfigService` is used to retrieve configuration settings from the environment, such as API URLs and secret keys.
 * The `DtoToRefund` DTO represents the data required to process a refund. The `BadRequestException` is used to throw exceptions when invalid requests are made.
 * Various injected use case interfaces like `IGetCakeDetailsUseCase`, `IGetUserDetailUseCase`, and `IGetOrderDetailsUseCaese`
 * are utilized to fetch the required data for processing payments and refunds.
 *
 * Company: BigBurry Hypersystems LLP
 */
import axios from 'axios';
import { PaymentGateway } from 'src/modules/payments/applicationLayer/interfaces/payment.interface';
import { DtoToGetPaymentSessionId } from 'src/common/dtos/DtoToGetPaymentSessionId.dto';
import { ConfigService } from '@nestjs/config';
import { DtoToRefund } from '../../../../../common/dtos/dtoToRefund.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IGetCakeDetailsUseCase } from '../../../applicationLayer/interfaces/get-cake-details.interface';
import { IGetUserDetailUseCase } from '../../../applicationLayer/interfaces/get-user-details.interface';
import { GETCAKEDETAILS } from '../../../tokens/getcakedetails.token';
import { GETUSERDETAILS } from '../../../tokens/getuserdetails.token';
import { IGetOrderDetailsUseCaese } from '../../../applicationLayer/interfaces/get-order-details.interface';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { GETORDERDETAILS } from '../../../tokens/getOrderDetails.token';
import { IChangeOrderStatusUseCase } from '../../../applicationLayer/interfaces/change-order-status.interface';
import { CHANGEORDERSTATUS } from '../../../tokens/changeorderstatus.token';
@Injectable()
export class CashFreePaymentGatewayImp implements PaymentGateway {
  constructor(
    @Inject(GETCAKEDETAILS)
    private readonly getCakeDetailsUseCase: IGetCakeDetailsUseCase,
    @Inject(GETUSERDETAILS)
    private readonly getUserDetailUseCase: IGetUserDetailUseCase,
    @Inject(GETORDERDETAILS)
    private readonly IGetOrderDetails: IGetOrderDetailsUseCaese,
    @Inject(CHANGEORDERSTATUS)
    private readonly IChangeOrderStatusUseCase: IChangeOrderStatusUseCase,
    private readonly configService: ConfigService,
  ) {}
  /**
   * The `getsessionid` method interacts with the CashFree API to create a payment session. It first validates the
   * order's status, ensuring that the order is confirmed and not already paid. If the order is valid, it constructs
   * a request with the order, user, and cake details and sends it to the CashFree API. If successful, it returns the
   * payment session ID, which is needed to complete the payment process.
   *
   * @param DtoToGetPaymentSessionId The data transfer object containing details such as the order ID, cake ID, and user ID.
   * @returns Returns the payment session ID upon successful creation of the payment session.
   * @throws BadRequestException If the order is either not confirmed or already paid, an exception is thrown.
   *
   * Company: BigBurry Hypersystems LLP
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
      DtoToGetPaymentSessionId._id,
    );
    if (order.order_status === ORDER_STATUS.REQUESTED) {
      throw new BadRequestException('The order is not confirm to pay.');
    } else if (order.order_status === ORDER_STATUS.ORDERED) {
      throw new BadRequestException('The order is already paid.');
    }
    const orderData = {
      order_id: DtoToGetPaymentSessionId._id,
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
   * The `refundPayment` method processes refunds via the CashFree API. It creates a refund request with the provided
   * refund amount and other necessary details, such as the refund ID and refund speed. The response from CashFree's API
   * is returned to indicate the success or failure of the refund operation.
   *
   * @param DtoToRefund The data transfer object containing details like the refund amount, refund note, and order ID.
   * @returns Returns the response from the CashFree API indicating the status of the refund request.
   *
   * Company: BigBurry Hypersystems LLP
   */
  async refundPayment(DtoToRefund: DtoToRefund): Promise<string> {
    DtoToRefund.refund_speed = 'STANDARD';
    DtoToRefund.refund_id = `refund_${Date.now()}`;
    const response = await axios.post(
      this.configService.get<string>('CASHFREE_API_URL') +
        `/orders/${DtoToRefund._id}/refunds`,
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
    let updatedstatus = {
      _id: DtoToRefund._id,
      new_status: ORDER_STATUS.REFUND_INITIATED,
      user_id: DtoToRefund.user_id,
    };
    await this.IChangeOrderStatusUseCase.execute(updatedstatus);
    return response.data;
  }
}
