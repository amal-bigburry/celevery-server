import { Expose } from 'class-transformer';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { known_fors } from 'src/common/utils/known_fors';
export class OrderDto {
  @Expose({ name: '_id' }) id: string;
  createdAt: Date;
  updatedAt: Date;
  @IsNotEmpty() @IsString() @IsMongoId() cake_id: string;
  payment_tracking_id: string;
  order_id: string;
  order_status: string;
  @IsNotEmpty() @IsString() cake_variant_id: string;
  @IsNotEmpty() @IsNumber() need_before: string;
  @IsNotEmpty() quantity: number;
  buyer_id: string;
  @IsEnum(known_fors, { message: "Please choose the known_for from the available ones" }) known_for: string;
  seller_id: string;
}
