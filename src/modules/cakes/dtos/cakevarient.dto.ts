/**
 * importing required packages
 */
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
export class CakeVariantDto {
  @IsNumber()
  @Type(() => Number)
  preparation_time: string;
  @IsNumber()
  @Type(() => Number)
  weight: string;
  @IsNumber()
  @Type(() => Number)
  cake_mrp: string;
  @IsNumber()
  @Type(() => Number)
  cake_price: string;
  @IsString()
  cake_status: string;
}
