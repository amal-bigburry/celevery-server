/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaymentGateway } from '../repository/payment.repository';
import { PAYMENTTOKEN } from '../tokens/payment.token';
/**
 * Injectable service file  to transfer amount
 */
@Injectable()
export class TransferAmountUsecase {
  constructor(
    @Inject(PAYMENTTOKEN) private readonly paymentGateway: PaymentGateway,
  ) {}
  /**
   * funtion to execute
   */
  async execute(): Promise<string> {
    await this.paymentGateway.splitpayment();
    return '';
  }
}
