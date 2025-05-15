/**
 * importing required packages
 */
import { IsNumber, IsString } from 'class-validator';
export class CakeVariantDto {
  @IsNumber()
  preparation_time: string;
  @IsNumber()
  weight: string;
  @IsNumber()
  cake_mrp: string;
  @IsNumber()
  cake_price: string;
  @IsString()
  cake_status: string;
}
