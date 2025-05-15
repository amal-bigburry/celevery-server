/**
 * Importing required packages
 */
import { CakeCategoryDto } from 'src/modules/cakecategories/dtos/cakecategory.dto';
/**
 * Interface of cakerepository
 */
export interface CakeCategoryRepository {
  findCategoryById(cakeCategoryId:string): Promise<CakeCategoryDto>;
}
