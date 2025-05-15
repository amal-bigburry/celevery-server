/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaymentGateway } from '../repository/payment.repository';
import { DtoToRefund } from '../../Dtos/dtoToRefund.dto';
import { PAYMENTTOKEN } from '../tokens/payment.token';
/**
 * Injectable service file to refund the payment
 */
@Injectable()
export class RefundUsecase {
  constructor(
    @Inject(PAYMENTTOKEN) private readonly paymentGateway: PaymentGateway,
  ) {}
  /**
   * function to excute the task
   */
  async execute(DtoToRefund: DtoToRefund): Promise<string> {
    const status = await this.paymentGateway.refundPayment(DtoToRefund);
    return status;
  }
}
