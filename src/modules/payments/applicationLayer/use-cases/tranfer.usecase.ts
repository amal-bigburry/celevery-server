/**
 * Importing the required packages and dependencies for the TransferAmountUsecase service.
 * The `Inject` and `Injectable` decorators from `@nestjs/common` are used to enable dependency injection in the NestJS framework,
 * allowing the service to access the `PaymentGateway`, which handles payment-related operations, including amount transfers.
 * The `PAYMENTTOKEN` symbol is used to inject the specific payment gateway implementation into the service.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaymentGateway } from '../interfaces/payment.repository';
import { PAYMENTTOKEN } from '../../tokens/payment.token';

/**
 * Injectable service responsible for transferring an amount using the payment gateway.
 * The `TransferAmountUsecase` class implements the logic for initiating the transfer of an amount (e.g., splitting payments).
 * It interacts with the `PaymentGateway` service to perform the payment transfer operation.
 * 
 * Constructor:
 * - The constructor uses the `@Inject` decorator to inject the `PaymentGateway` into the service, making it available to interact with 
 *   the payment gateway for performing the transfer of amounts or splitting payments.
 * 
 * Methods:
 * - `execute`: This method does not require any parameters and is responsible for triggering the transfer process.
 *   It calls the `splitpayment` method from the injected `PaymentGateway` service to perform the transfer action.
 *   The method returns an empty string (`''`) as a placeholder, but this could be updated to return status or results in the future.
 * 
 * The `TransferAmountUsecase` abstracts the logic for transferring amounts, ensuring that the payment gateway logic is separated from
 * the rest of the application. This provides cleaner code and ensures consistency in how amounts are transferred across the system.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class TransferAmountUsecase {
  constructor(
    @Inject(PAYMENTTOKEN) private readonly paymentGateway: PaymentGateway,  // Injecting the payment gateway service for transferring amounts
  ) {}

  /**
   * Executes the task of transferring an amount (e.g., splitting payments).
   * This method calls the `splitpayment` method from the `PaymentGateway` service to initiate the amount transfer process.
   * 
   * @returns A Promise that resolves to an empty string (could be updated to provide status or confirmation in the future).
   * 
   * Company: BigBurry Hypersystems LLP
   */
  async execute(): Promise<string> {
    await this.paymentGateway.splitpayment();  // Calling the payment gateway to handle the transfer (e.g., splitting the payment)
    return '';  // Returning an empty string (placeholder, could be updated for further status or information)
  }
}
