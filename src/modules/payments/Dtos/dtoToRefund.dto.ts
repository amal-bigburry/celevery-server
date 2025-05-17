import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO (Data Transfer Object) for processing a refund request.
 * The `DtoToRefund` class defines the structure of the data required to process a refund for an order. 
 * This DTO ensures that the necessary data, such as the order ID, refund amount, and other relevant details, 
 * are validated before being passed to the service that handles the refund operation.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export class DtoToRefund {
  /**
   * The unique identifier of the order that needs to be refunded.
   * This property holds the order ID, which is essential for identifying the order in the system that is associated with the refund request.
   * 
   * The `@IsNotEmpty()` and `@IsString()` decorators ensure that the order ID is a non-empty string, which is crucial for locating the specific order in the database.
   * 
   * @example "507f1f77bcf86cd799439011" - A valid string representing the order ID for the refund.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  @IsNotEmpty()
  @IsString()
  order_id: string;  // The order ID that corresponds to the order being refunded

  /**
   * The amount to be refunded for the specified order.
   * This property represents the refund amount that needs to be processed, and it must be a non-empty string value.
   * 
   * The `@IsNotEmpty()` and `@IsString()` decorators validate that this property is a non-empty string.
   * This ensures that the refund amount is provided correctly for processing the refund.
   * 
   * @example "50.00" - A string value representing the refund amount.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  @IsNotEmpty()
  @IsString()
  refund_amount: string;  // The amount to be refunded for the order

  /**
   * The unique identifier for the refund itself.
   * This property holds the refund ID, which is used to uniquely identify a specific refund transaction in the system.
   * The `refund_id` is important for tracking and referencing the refund within the payment gateway or financial system.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  refund_id: string;  // The unique identifier for the refund transaction

  /**
   * A note or description about the refund.
   * This property provides additional information or context about the refund. It is a non-empty string to ensure that the refund context is always provided.
   * 
   * The `@IsNotEmpty()` and `@IsString()` decorators validate that this property is a non-empty string, which helps in maintaining the clarity of the refund operation.
   * 
   * @example "Refund due to cancellation of the order" - A note explaining the reason for the refund.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  @IsNotEmpty()
  @IsString()
  refund_note: string;  // A note explaining the reason for the refund

  /**
   * The speed at which the refund should be processed.
   * This property defines the desired speed for processing the refund, such as "standard" or "express".
   * The `refund_speed` field provides flexibility in how refunds are handled depending on business needs or customer requests.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  refund_speed: string;  // The speed of the refund processing (e.g., standard, express)
}
