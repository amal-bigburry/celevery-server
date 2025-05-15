/**
 * importing required packages
 */
import { DtoToGetPaymentSessionId } from 'src/modules/orders/dtos/DtoToGetPaymentSessionId.dto';
import { DtoToRefund } from '../../Dtos/dtoToRefund.dto';
/**
 * payment gateway repository
 */
export interface PaymentGateway {
  getsessionid(
    DtoToGetPaymentSessionId: DtoToGetPaymentSessionId,
  ): Promise<Object>;
  refundPayment(DtoToRefund: DtoToRefund): Promise<string>;
  splitpayment(): Promise<string>;
}
