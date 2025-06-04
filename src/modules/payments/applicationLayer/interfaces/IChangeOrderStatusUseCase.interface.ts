/**
 * Importing the required packages for handling order data.
 * The `OrderDto` represents the Data Transfer Object (DTO) used to manage and structure the data for orders in the system.
 * It allows for the safe and consistent transfer of order-related information across layers of the application.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { OrderDto } from 'src/common/dtos/Order.dto';

/**
 * Interface for the use case responsible for changing the status of an order.
 * The `IChangeOrderStatusUseCase` defines a contract for a class that will implement the logic for updating the status of an order.
 * The `execute` method, when implemented, will accept an `updatedstatus` parameter, which represents the new status of the order,
 * and return a `Promise` that resolves to an `OrderDto` object, reflecting the updated order details.
 * 
 * This interface ensures that any implementation of the use case follows a standard structure, allowing the status change logic to
 * be encapsulated and easily tested. It provides clear abstraction for order status management and decouples the business logic
 * from other parts of the system.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export interface IChangeOrderStatusUseCase {
  execute(updatedstatus): Promise<OrderDto>;  // Method to change the status of an order and return the updated order details
}
