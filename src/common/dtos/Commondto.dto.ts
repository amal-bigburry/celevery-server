import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO (Data Transfer Object) for common operations related to order management.
 * This class is used to define the structure of the data that will be transferred during operations such as 
 * changing the order status, refunding an order, or other actions requiring a unique identifier for an order.
 * 
 * The `CommonDto` class ensures that the necessary data (in this case, the order ID) is validated before it is used
 * in the application to prevent errors due to invalid or missing data.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export class CommonDto {
  /**
   * The MongoDB ID of the order that needs to be processed (e.g., refunded, updated, etc.).
   * This property holds the unique identifier for an order in MongoDB, which is used for locating the order
   * in the database to perform actions such as refunding or changing its status.
   * 
   * The `@IsMongoId()` decorator ensures that the provided value is a valid MongoDB ObjectId, 
   * which is crucial for working with MongoDB-based systems and maintaining data integrity.
   * 
   * @example "507f1f77bcf86cd799439011" - A valid MongoDB ObjectId representing an order.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  @IsMongoId()
  mongodbid: string;  // MongoDB order ID required for identifying the specific order to be processed
}
