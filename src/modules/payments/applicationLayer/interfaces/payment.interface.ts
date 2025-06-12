/**
 * Importing the required packages for handling payment gateway operations.
 * The `DtoToGetPaymentSessionId` is a Data Transfer Object (DTO) used to structure and transfer data required to retrieve
 * a payment session ID. This DTO ensures that the payment session creation process is standardized and handled properly.
 * The `DtoToRefund` is another DTO used for structuring data related to the refund operation, ensuring consistency in the
 * refund process.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { DtoToGetPaymentSessionId } from 'src/common/dtos/DtoToGetPaymentSessionId.dto';
import { DtoToRefund } from '../../../../common/dtos/dtoToRefund.dto';
import { VendorDto } from '../../../../common/dtos/vendor.dto';
/**
 * Interface representing the payment gateway repository.
 * The `PaymentGateway` interface defines the contract for any payment gateway service implementation.
 * It includes methods for interacting with the payment gateway to retrieve payment session IDs, process refunds, and handle 
 * split payments.
 * 
 * Methods:
 * - `getsessionid`: Takes a `DtoToGetPaymentSessionId` object as input, which contains the necessary data to retrieve a payment
 *   session ID. The method returns a `Promise` that resolves to an `Object`, typically containing the session ID or related
 *   payment details.
 * 
 * - `refundPayment`: Takes a `DtoToRefund` object as input, which contains the required data for processing a refund. The method
 *   returns a `Promise` that resolves to a string, typically representing the result or confirmation of the refund.
 * 
 * - `splitpayment`: A method designed to handle split payments, likely involving multiple parties. It returns a `Promise` that resolves
 *   to a string representing the result or confirmation of the split payment operation.
 * 
 * This interface serves as a contract for any class that implements the payment gateway functionality, ensuring the methods
 * for handling payments, refunds, and session management are consistent and adhere to the same structure.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export interface PaymentInterface {
  getsessionid(
    DtoToGetPaymentSessionId: DtoToGetPaymentSessionId, // Method to retrieve a payment session ID based on the provided DTO
  ): Promise<Object>;
  refundPayment(DtoToRefund: DtoToRefund): Promise<string>;  // Method to process a refund using the provided DTO
}
