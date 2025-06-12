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
import { PaymentInterface } from 'src/modules/payments/applicationLayer/interfaces/payment.interface';
import { DtoToGetPaymentSessionId } from 'src/common/dtos/DtoToGetPaymentSessionId.dto';
import { ConfigService } from '@nestjs/config';
import { DtoToRefund } from '../../../../common/dtos/dtoToRefund.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GetCakeDetailInterface } from '../../../../common/interfaces/get-cake-details.interface';
import { GetUserDetailInterface } from '../../../../common/interfaces/get-user-details.interface';
import { GETCAKEDETAILS } from '../../tokens/getcakedetails.token';
import { GETUSERDETAILS } from '../../tokens/getuserdetails.token';
import { GetOrderDetailsInterface } from '../../../../common/interfaces/get-order-details.interface';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { GETORDERDETAILS } from '../../tokens/getOrderDetails.token';
import { ChangeOrderStatusInterface } from '../../../../common/interfaces/change-order-status.interface';
import { CHANGEORDERSTATUS } from '../../tokens/changeorderstatus.token';
import { UpdateSessionidUseCaseInterface } from 'src/common/interfaces/update-session-id.interface';
import { UPDATESESSIONIDTOKEN } from '../../tokens/updatesessionid.token';
@Injectable()
export class CashFreePaymentGatewayImp implements PaymentInterface {
  constructor(
    @Inject(GETCAKEDETAILS)
    private readonly getCakeDetailsUseCase: GetCakeDetailInterface,
    @Inject(GETUSERDETAILS)
    private readonly GetUserDetailInterface: GetUserDetailInterface,
    @Inject(GETORDERDETAILS)
    private readonly GetOrderDetailsInterface: GetOrderDetailsInterface,
    @Inject(CHANGEORDERSTATUS)
    private readonly ChangeOrderStatusInterface: ChangeOrderStatusInterface,
    @Inject(UPDATESESSIONIDTOKEN)
    private readonly UpdateSessionIdUsecase: UpdateSessionidUseCaseInterface,
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
    let user = await this.GetUserDetailInterface.execute(
      DtoToGetPaymentSessionId.user_id,
    );
    let order = await this.GetOrderDetailsInterface.execute(
      DtoToGetPaymentSessionId.order_id,
    );
    if (order.order_status === ORDER_STATUS.REQUESTED) {
      throw new BadRequestException('The order is not confirm to pay.');
    } else if (order.order_status === ORDER_STATUS.ORDERED) {
      throw new BadRequestException('The order is already paid.');
    }

    console.log(order.session_id)
    if(order.session_id){
      return order.session_id
    }
    // console.log("contact number",user,"user")
    const orderData = {
      order_id: DtoToGetPaymentSessionId.order_id,
      order_amount: order.cake_price,
      order_currency: 'INR',
      customer_details: {
        customer_id: user?._id,
        customer_email: user?.email,
        customer_phone: order?.buyer_contact_number,
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
      await this.UpdateSessionIdUsecase.execute(order._id, response.data.payment_session_id )
      return response.data.payment_session_id;
    } else {
      throw new Error(response.data?.message || 'Order creation failed');
    }
    // return {}
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
    await this.ChangeOrderStatusInterface.execute(updatedstatus);
    return response.data;
  }
}
