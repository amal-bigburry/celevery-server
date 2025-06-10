/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages and data transfer objects
 */
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CakeDto } from '../../../../common/dtos/cake.dto';
/**
 * Interface defining the Cake Repository contract
 */
export interface CakeInterface {
  //find or get
  findAvailableCakes(user_id:string): Promise<CakeEntity[]>;
  findById(cake_id: string): Promise<CakeEntity | null>;
  findCakeByStoreId(store_id: string): Promise<CakeEntity[]>;
  find(
    keyword: string,
    category_id: string,
    log: number,
    lat: number,
    user_id:string,
  ): Promise<CakeEntity[]>;
  // create or upload
  createcake(cakeDto: CakeDto): Promise<Object>;
  uploadImage(files: Express.Multer.File[]): Promise<Array<string> | null>;
  updateKnownfor(cake_id: string, known_for: string): Promise<string>;
}
