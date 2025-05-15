import { IsNotEmpty, IsString } from 'class-validator';
/**
 * change order status
 */
export class DtoToRefund {
  /**
   * order id of the order that need to be refunded
   */
  @IsNotEmpty()
  @IsString()
  order_id: string;
  /**
   * refund amount
   */
  @IsNotEmpty()
  @IsString()
  refund_amount: string;
  /**
   * refund id of the refund
   */
  refund_id: string;

  @IsNotEmpty()
  @IsString()
  refund_note: string;

  refund_speed: string;
}
