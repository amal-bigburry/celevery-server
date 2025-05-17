
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
/**
 * change order status
 */
export class MesssageSendDto {
  /**
   * order id of the order that need to be refunded
   */
  @IsMongoId()
  support_id: string;
  /**
   * order id of the order that need to be refunded
   */
  @IsNotEmpty()
  messages: Array<object>;
}
