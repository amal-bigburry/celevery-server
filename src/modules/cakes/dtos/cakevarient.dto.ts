/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing necessary decorators and transformer
 */
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
/**
 * Data Transfer Object representing a Cake Variant
 */
export class CakeVariantDto {
  /**
   * Preparation time in appropriate units, validated as a number
   */
  @IsNumber()
  @Type(() => Number)
  preparation_time: string;
  /**
   * Weight of the cake variant, validated as a number
   */
  @IsNumber()
  @Type(() => Number)
  weight: string;
  /**
   * Maximum retail price of the cake variant, validated as a number
   */
  @IsNumber()
  @Type(() => Number)
  cake_mrp: string;
  /**
   * Selling price of the cake variant, validated as a number
   */
  @IsNumber()
  @Type(() => Number)
  cake_price: string;
  /**
   * Status of the cake variant (e.g. available, out of stock), validated as a string
   */
  @IsString()
  cake_status: string;
}
