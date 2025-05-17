/**
 * Importing required packages
 */
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CakeDto } from '../../dtos/cake.dto';
/**
 * Interface of cakerepository
 */
export interface CakeRepository {
  findAll(page, limit, log, lat): Promise<PaginationDto>;
  findById(cake_id: string): Promise<CakeEntity | null>;
  find(keyword: string, category_id: string): Promise<CakeEntity[]>;
  createcake(cakeDto: CakeDto): Promise<Object>;
  uploadImage(files: Express.Multer.File[]): Promise<Array<string> | null>;
  updateKnownfor(cake_id:string, known_for:string):Promise<string> 
}
