import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
/**
 * dto to handle the order
 */
export class OrderDto {
  /**
   * cake_id
   */
  @Expose({ name: '_id' })
  id: string;

  createdAt: Date;
  updatedAt: Date;
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  cake_id: string;
  /**
   * payment order id
   */
  payment_tracking_id: string;
  /**
   * order id
   *  */
  order_id: string;
  /**
   * status of the order
   */
  order_status: string;
  /**
   * variant id
   */
  @IsNotEmpty()
  @IsString()
  cake_variant_id: string;
  /**
   * when do the buyer wants the cake
   */
  @IsNotEmpty()
  @IsNumber()
  need_before: string;
  /**
   * quantity of the cake
   */
  @IsNotEmpty()
  quantity: number;

  buyer_id: string;
  seller_id: string;
}
