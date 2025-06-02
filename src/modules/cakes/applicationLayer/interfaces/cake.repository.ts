/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages and data transfer objects
 */
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CakeDto } from '../../dtos/cake.dto';
/**
 * Interface defining the Cake Repository contract
 */
export interface CakeRepository {
  /**
   * Retrieves paginated list of cakes based on location and pagination parameters
   * @param page - The page number to retrieve
   * @param limit - Number of items per page
   * @param log - Longitude coordinate for location-based filtering
   * @param lat - Latitude coordinate for location-based filtering
   * @returns A Promise resolving to PaginationDto containing cakes data
   */
  findAll(page:number, limit:number, log:number, lat:number, knownfor:string[], sortby:string, orderby:string): Promise<PaginationDto>;
  /**
   * Finds a cake entity by its unique identifier
   * @param cake_id - The unique ID of the cake
   * @returns A Promise resolving to the CakeEntity or null if not found
   */
  findById(cake_id: string): Promise<CakeEntity | null>;
  /**
   * Finds cakes matching a keyword and category ID
   * @param keyword - Search keyword for cake names or details
   * @param category_id - Category identifier to filter cakes
   * @returns A Promise resolving to an array of CakeEntity matching the criteria
   */
  find(
    keyword: string,
    category_id: string,
    log: number,
    lat: number,

    // known_for: string[],
    // include: string[],
  ): Promise<CakeEntity[]>;
  /**
   * Creates a new cake record using the provided data transfer object
   * @param cakeDto - Data transfer object containing cake details
   * @returns A Promise resolving to an object representing the created cake
   */
  createcake(cakeDto: CakeDto): Promise<Object>;
  /**
   * Uploads multiple image files and returns an array of URLs or null
   * @param files - Array of image files to upload
   * @returns A Promise resolving to an array of image URLs or null if upload fails
   */
  uploadImage(files: Express.Multer.File[]): Promise<Array<string> | null>;
  /**
   * Updates the 'known_for' attribute of a cake by its ID
   * @param cake_id - The ID of the cake to update
   * @param known_for - New known_for value
   * @returns A Promise resolving to a string status or message
   */
  updateKnownfor(cake_id: string, known_for: string): Promise<string>;
}
