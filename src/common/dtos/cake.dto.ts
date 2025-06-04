/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required validation decorators and transformer
 */
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CakeVariantDto } from './cakevarient.dto';
import { Type } from 'class-transformer';
/**
 * Data Transfer Object (DTO) class representing a Cake
 */
export class CakeDto {
  /**
   * Name of the cake - must be a non-empty string
   */
  @IsString()
  @IsNotEmpty()
  cake_name: string;
  /**
   * Description of the cake - must be a non-empty string
   */
  @IsString()
  @IsNotEmpty()
  cake_description: string;
  /**
   * Array holding URLs for cake images
   */
  cake_image_urls: Array<string>;
  /**
   * Array of category IDs associated with the cake
   * Must be a non-empty array of valid MongoDB ObjectIds as strings
   */
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  cake_category_ids: Array<string>;
  /**
   * Store ID associated with this cake - must be a non-empty string
   */
  @IsString()
  @IsNotEmpty()
  store_id: string;
  /**
   * Array of cake variant DTOs, validated as nested objects
   */
  @ValidateNested({ each: true })
  @Type(() => CakeVariantDto)
  @IsArray()
  cake_variants: CakeVariantDto[];
  /**
   * Description of what the cake is known for
   */
  @IsString()
  known_for:string;
}
