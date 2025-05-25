/**
 * Importing the required packages and dependencies for the RefundUsecase service.
 * The `Inject` and `Injectable` decorators from `@nestjs/common` are used to enable dependency injection within the NestJS framework,
 * allowing the service to access the `PaymentGateway` which handles payment processing operations.
 * The `DtoToRefund` is the Data Transfer Object (DTO) used to transfer refund-related data.
 * The `PAYMENTTOKEN` symbol serves as a unique identifier for the payment gateway service to inject into the use case.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaymentGateway } from '../interfaces/payment.repository';
import { DtoToRefund } from '../../dtos/dtoToRefund.dto';
import { PAYMENTTOKEN } from '../../tokens/payment.token';

/**
 * Injectable service responsible for processing payment refunds.
 * The `RefundUsecase` class implements the logic for handling refund requests.
 * It interacts with the `PaymentGateway` to perform refund operations.
 * 
 * Constructor:
 * - The constructor uses the `@Inject` decorator to inject the `PaymentGateway` service into the use case, 
 *   making it available for processing refund requests.
 * 
 * Methods:
 * - `execute`: This method takes a `DtoToRefund` object, which contains the data required to process a refund.
 *   It calls the `refundPayment` method of the injected `PaymentGateway` service to initiate the refund process.
 *   The method returns a `Promise` that resolves to a string, representing the status or confirmation of the refund operation.
 * 
 * The `RefundUsecase` ensures that the refund logic is encapsulated and reusable, allowing for clean and consistent handling
 * of payment refunds in the system.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class RefundUsecase {
  constructor(
    @Inject(PAYMENTTOKEN) private readonly paymentGateway: PaymentGateway,  // Injecting the payment gateway service for handling refunds
  ) {}

  /**
   * Executes the task of processing a payment refund.
   * This method accepts a `DtoToRefund` object, which contains the necessary data to initiate the refund.
   * It then calls the `refundPayment` method on the `PaymentGateway` service to perform the refund operation.
   * 
   * @param DtoToRefund - DTO containing the data required to process the refund.
   * @returns A Promise that resolves to a string, typically representing the status or confirmation of the refund.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  async execute(DtoToRefund: DtoToRefund): Promise<string> {
    const status = await this.paymentGateway.refundPayment(DtoToRefund); // Calling the payment gateway to process the refund
    return status; // Returning the status of the refund operation
  }
}
