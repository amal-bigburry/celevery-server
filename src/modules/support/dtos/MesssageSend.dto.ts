/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing decorators from the 'class-validator' library to enforce validation rules on DTO properties.
 * These decorators provide runtime validation to ensure incoming data conforms to expected formats and constraints,
 * improving data integrity and preventing invalid data propagation through the system.
 */
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This Data Transfer Object (DTO) class, MesssageSendDto, represents the structure and validation rules
 * for data used when sending messages related to support orders.
 * It encapsulates the details required to change the status or send messages regarding a support request.
 */
export class MesssageSendDto {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The support_id property represents the unique identifier of the support order that requires processing.
 * It is validated using the @IsMongoId decorator to ensure it matches the expected MongoDB ObjectId format.
 */
  @IsMongoId()
  support_id: string;

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The messages property holds an array of message objects associated with the support request.
 * The @IsNotEmpty decorator ensures that this array is not empty, enforcing that at least one message must be provided.
 */
  @IsNotEmpty()
  messages: Array<object>;
}
