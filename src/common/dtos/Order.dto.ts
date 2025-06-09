import { Optional } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  isBoolean,
  IsEnum,
  IsMongoId,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { known_fors } from 'src/common/utils/known_fors';
export class OrderDto {
  @Expose({ name: '_id' }) id: string;
  createdAt: Date;
  updatedAt: Date;
  @IsNotEmpty() @IsString() @IsMongoId() cake_id: string;
  payment_tracking_id: string;
  order_status: string;
  @IsBoolean()
  @IsOptional()
  is_paid: boolean;
  @IsNotEmpty() @IsString() cake_variant_id: string;
  @IsNotEmpty() @IsString() need_before: string;
  @IsNotEmpty() quantity: number;
  buyer_id: string;
  @Transform(({ value }) => value ?? '')
  @IsString()
  @IsOptional()
  text_on_cake: string;
  @IsOptional()
  @Transform(({ value }) => value ?? '')
  @IsEnum(known_fors, {
    message: 'Please choose the known_for from the available ones',
  })
  known_for: string;
  seller_id: string;
  cancelled_by: string;
  @IsOptional()
  @IsString()
  cancellation_reason: string;
}
