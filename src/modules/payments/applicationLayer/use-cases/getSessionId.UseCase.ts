/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaymentGateway } from '../repository/payment.repository';
import { DtoToGetPaymentSessionId } from 'src/modules/orders/dtos/DtoToGetPaymentSessionId.dto';
import { PAYMENTTOKEN } from '../tokens/payment.token';
import { IGetOrderDetailsUseCaese } from '../interfaces/IGetOrderDetailsUseCaese.interface';
import { GETORDERDETAILS } from '../tokens/getOrderDetails.token';
/**
 * Injectable service file to create order
 */
@Injectable()
export class GetSessionIdUseCase {
  constructor(
    @Inject(PAYMENTTOKEN) private readonly paymentGateway: PaymentGateway,
    @Inject(GETORDERDETAILS)
    private readonly GetOrderDetailsUseCaese: IGetOrderDetailsUseCaese,
  ) {}
  /**
   * function to execute the task
   */
  async execute(
    DtoToGetPaymentSessionId: DtoToGetPaymentSessionId,
  ): Promise<Object> {
    let order = await this.GetOrderDetailsUseCaese.execute(
      DtoToGetPaymentSessionId.order_id,
    );
    DtoToGetPaymentSessionId.user_id = order.buyer_id;
    DtoToGetPaymentSessionId.cake_id = order.cake_id;
    DtoToGetPaymentSessionId.variant_id = order.cake_variant_id;
    let sessionData = await this.paymentGateway.getsessionid(
      DtoToGetPaymentSessionId,
    );
    return sessionData;
  }
}
