/**
 * Importing the required packages and dependencies for the GetSessionIdUseCase service.
 * The `Inject` and `Injectable` decorators from `@nestjs/common` are used to enable dependency injection in the NestJS framework,
 * allowing the service to access other components like the `PaymentGateway` and `IGetOrderDetailsUseCaese`.
 * The `PaymentGateway` interface is used to interact with the payment processing system for generating payment session IDs.
 * The `DtoToGetPaymentSessionId` DTO is used to transfer the data required to initiate the payment session.
 * The `PAYMENTTOKEN` symbol is used for identifying the payment gateway service to inject.
 * The `IGetOrderDetailsUseCaese` interface provides the method for retrieving order details.
 * The `GETORDERDETAILS` symbol is used to inject the service responsible for fetching order details.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaymentGateway } from '../repository/payment.repository';
import { DtoToGetPaymentSessionId } from 'src/modules/orders/dtos/DtoToGetPaymentSessionId.dto';
import { PAYMENTTOKEN } from '../tokens/payment.token';
import { IGetOrderDetailsUseCaese } from '../interfaces/IGetOrderDetailsUseCaese.interface';
import { GETORDERDETAILS } from '../tokens/getOrderDetails.token';

/**
 * Injectable service responsible for creating a payment session ID for an order.
 * The `GetSessionIdUseCase` class provides the functionality to interact with the payment gateway and generate a session ID.
 * It uses the injected `PaymentGateway` to retrieve the session ID and the `IGetOrderDetailsUseCaese` service to fetch the details
 * of the order that the session ID corresponds to.
 * 
 * Constructor:
 * - The constructor uses the `@Inject` decorator to inject the `PaymentGateway` and `IGetOrderDetailsUseCaese` dependencies
 *   into the service, allowing it to interact with the payment system and retrieve order details as required.
 * 
 * Methods:
 * - `execute`: This method accepts a `DtoToGetPaymentSessionId` object as an argument, which contains the necessary information
 *   to create the payment session. The method first fetches the order details based on the `order_id` provided in the DTO.
 *   It then updates the DTO with the order's `user_id`, `cake_id`, and `variant_id` before passing the updated DTO to the
 *   payment gateway's `getsessionid` method to generate the session data, which is then returned.
 * 
 * The `GetSessionIdUseCase` class abstracts the logic for creating a payment session ID, ensuring that the payment-related
 * operations are separated from other parts of the application, maintaining clean separation of concerns.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class GetSessionIdUseCase {
  constructor(
    @Inject(PAYMENTTOKEN) private readonly paymentGateway: PaymentGateway, // Injecting the payment gateway service to handle payment session creation
    @Inject(GETORDERDETAILS)
    private readonly GetOrderDetailsUseCaese: IGetOrderDetailsUseCaese, // Injecting the service to retrieve order details based on order ID
  ) {}

  /**
   * Executes the task of creating a payment session ID for a specific order.
   * This method retrieves the order details, updates the provided DTO with relevant data from the order,
   * and then calls the payment gateway's `getsessionid` method to generate the session ID for the order's payment.
   * 
   * @param DtoToGetPaymentSessionId - DTO containing the data required to generate the payment session ID.
   * @returns A Promise that resolves to an object containing the session data.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  async execute(
    DtoToGetPaymentSessionId: DtoToGetPaymentSessionId, // Data transfer object for payment session creation
  ): Promise<Object> {
    let order = await this.GetOrderDetailsUseCaese.execute(
      DtoToGetPaymentSessionId.order_id, // Fetching order details using the provided order ID
    );
    DtoToGetPaymentSessionId.user_id = order.buyer_id; // Assigning the user ID from the order to the DTO
    DtoToGetPaymentSessionId.cake_id = order.cake_id; // Assigning the cake ID from the order to the DTO
    DtoToGetPaymentSessionId.variant_id = order.cake_variant_id; // Assigning the variant ID from the order to the DTO
    let sessionData = await this.paymentGateway.getsessionid(
      DtoToGetPaymentSessionId, // Calling the payment gateway to get the session ID
    );
    return sessionData; // Returning the session data
  }
}
