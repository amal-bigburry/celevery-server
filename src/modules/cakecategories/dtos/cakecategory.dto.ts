/**
 * Importing the necceasy files
 */
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * class
 */
export class CakeCategoryDto {
  /**
   * image url of the category
   */
  category_image_url: string;
  /**
   * Name of the category
   */
  @IsString()
  @IsNotEmpty()
  category_name: string;
}
