/**
 * Importing the required packages for handling order-related data.
 * The `OrderDto` is a Data Transfer Object (DTO) that represents the structure of order data used in the application.
 * This DTO is used to transfer information about orders in a standardized way across the system.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { OrderDto } from 'src/common/dtos/Order.dto';
/**
 * Interface for the use case responsible for fetching all orders that are waiting for payment.
 * The `IGetAllPaymentWaitingOrdersUseCase` defines a contract for the class that will implement the logic for retrieving 
 * orders that are pending payment. 
 * The `execute` method, when implemented, will return a `Promise` that resolves to an array of `OrderDto` objects, each 
 * representing an order waiting for payment to be processed.
 * 
 * This interface abstracts the logic for retrieving payment-waiting orders, making the implementation easily testable and maintainable.
 * It ensures that the system can consistently manage and access orders awaiting payment in a structured and predictable manner.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export interface IGetAllPaymentWaitingOrdersUseCase {
  execute(): Promise<OrderDto[]>;  // Method to retrieve all orders that are waiting for payment
}
