/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing the necessary files for validation
 */
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * Data Transfer Object class for Cake Category
 */
export class CakeCategoryDto {
  /**
   * Image URL of the cake category
   */
  category_image_url: string;
  /**
   * Name of the cake category
   * Must be a non-empty string
   */
  @IsString()
  @IsNotEmpty()
  category_name: string;
}
