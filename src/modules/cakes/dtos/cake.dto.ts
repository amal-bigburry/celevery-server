/**
 * importing require packages
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
 * dto for cake class
 */
export class CakeDto {
  @IsString()
  @IsNotEmpty()
  cake_name: string;
  @IsString()
  @IsNotEmpty()
  cake_description: string;
  cake_image_urls: Array<string>;
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  cake_category_ids: Array<string>;
  @IsString()
  @IsNotEmpty()
  store_id: string;
  @ValidateNested({ each: true })
  @Type(() => CakeVariantDto)
  @IsArray()
  cake_varients: CakeVariantDto[];
}
