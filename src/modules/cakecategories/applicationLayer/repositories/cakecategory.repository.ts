/**
 * Importing Required Packages
 */
import { CakeCategoryDto } from '../../dtos/cakecategory.dto';
/**
 * Returns interface of cakecategory repository
 */
export interface CakeCategoryRepository {
  createcakecategory(cakeCategoryDto: CakeCategoryDto): Promise<Object>;
  findAll(): Promise<Array<any>>;
  uploadImage(file: Express.Multer.File): Promise<string | null>;
  findCategoryById(cakeCategoryId: string): Promise<CakeCategoryDto>;
}
