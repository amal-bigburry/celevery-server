import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO (Data Transfer Object) for processing a refund request.
 * The `DtoToRefund` class defines the structure of the data required to process a refund for an order.
 * This DTO ensures that the necessary data, such as the order ID, refund amount, and other relevant details,
 * are validated before being passed to the service that handles the refund operation.
 *
 * Company: BigBurry Hypersystems LLP
 */

class contact {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  phone: string;
}
class back_details {
  @IsNotEmpty()
  account_number: string;
  @IsNotEmpty()
  ifsc: string;
  @IsNotEmpty()
  bank_name: string;
}
class business_details {
  @IsNotEmpty()
  pan: string;
  @IsNotEmpty()
  gst: string;
}
export class VendorDto {
  @IsNotEmpty()
  @IsString()
  vendor_id: string;
  @IsNotEmpty() // A note explaining the reason for the refund
  name: string;
  @IsNotEmpty() // The speed of the refund processing (e.g., standard, express)
  contact: contact;
  @IsNotEmpty() // The ID of the order for which the refund is being requested
  bank_details: back_details;
  @IsNotEmpty()
  business_details: business_details; // The speed of the refund processing (e.g., standard, express)
}
