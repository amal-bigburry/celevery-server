/**
 * Importing the required packages for handling order data.
 * The `OrderDto` represents the Data Transfer Object (DTO) used to structure and transfer order data throughout the system.
 * This DTO ensures consistency and standardization of order-related information.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { OrderDetailDto } from 'src/common/dtos/orderDetail.dto';
/**
 * Interface for the use case responsible for fetching the details of a specific order.
 * The `IGetOrderDetailsUseCaese` defines the contract for the class that will implement the logic for retrieving the details
 * of an order based on the provided `_id`.
 * The `execute` method, when implemented, will accept an `_id` (string) as an input and return a `Promise` that resolves
 * to an `OrderDto`, which contains all the details of the specified order.
 * 
 * This interface serves as an abstraction, allowing for flexible implementation and easy testing of the order retrieval logic.
 * It ensures that any class implementing this interface will follow the same structure and can consistently handle order data.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export interface IGetOrderDetailsUseCaese {
  execute(_id: string): Promise<OrderDetailDto>;  // Method to retrieve order details based on the provided order ID
}
