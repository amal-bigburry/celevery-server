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
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CakeVariantDto } from './cakevarient.dto';
import { Transform, Type } from 'class-transformer';
/**
 * Data Transfer Object (DTO) class representing a Cake
 */
export class UpdateCakeDto {
  /**
   * Name of the cake - must be a non-empty string
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cake_name: string;
  /**
   * Description of the cake - must be a non-empty string
   */
  @IsOptional()
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
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  cake_category_ids: Array<string>;
  /**
   * Store ID associated with this cake - must be a non-empty string
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  store_id: string;
  /**
   * Array of cake variant DTOs, validated as nested objects
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CakeVariantDto)
  @IsArray()
  cake_variants: CakeVariantDto[];
  /**
   * Description of what the cake is known for
   */
  @IsOptional()
  @IsString()
  known_for: string;
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  is_eggless: boolean;
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  is_active: boolean;
}
