/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { CakeCategoryDto } from '../../../../common/dtos/cakecategory.dto';
/**
 * Returns interface of cakecategory repository
 */
export interface CakeCategoryInterface {
  // find
  findAll(): Promise<Array<any>>;
  findCategoryById(cakeCategoryId: string): Promise<CakeCategoryDto>;
  checkifexist(name: string): Promise<string>;
  // create or upload
  createcakecategory(cakeCategoryDto: CakeCategoryDto): Promise<Object>;
  uploadImage(file: Express.Multer.File): Promise<string | null>;
}
