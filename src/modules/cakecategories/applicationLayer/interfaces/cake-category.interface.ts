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
export interface CakeCategoryRepository {
  /**
   * Creates a new cake category using provided data transfer object
   */
  createcakecategory(cakeCategoryDto: CakeCategoryDto): Promise<Object>;
  /**
   * Retrieves all cake categories as an array
   */
  findAll(): Promise<Array<any>>;
  /**
   * Uploads an image file and returns the URL or null
   */
  uploadImage(file: Express.Multer.File): Promise<string | null>;
  /**
   * Finds a cake category by its unique identifier
   */
  findCategoryById(cakeCategoryId: string): Promise<CakeCategoryDto>;
  checkifexist(name: string):Promise<string>;
}
