/**
 * Importing required packages
 */
import { CakeCategoryDto } from 'src/modules/cakecategories/dtos/cakecategory.dto';
import { StoreDto } from 'src/modules/stores/Dtos/store.dto';
/**
 * Interface of cakerepository
 */
export interface IGetStoreUseCase {
  execute(cakeCategoryId:string): Promise<StoreDto>;
}
