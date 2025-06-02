/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for the use case
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../interfaces/cake.repository';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CAKE_REPOSITORY } from '../../tokens/cakeRepository.token';
/**
 * Injectable service class responsible for finding cakes with pagination and location filters
 */
@Injectable()
export class FindCakeUseCase {
  constructor(
    /**
     * Injecting CakeRepository to access cake data
     */
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * Executes the find operation with pagination and optional location parameters
   * @param page - Page number for pagination
   * @param limit - Number of items per page
   * @param log - Longitude coordinate for filtering by location
   * @param lat - Latitude coordinate for filtering by location
   * @returns Promise resolving to a PaginationDto containing cake results
   */
  async execute(page:number, limit:number, log:number, lat:number, knownfor:string[], sortby:string, orderby:string): Promise<PaginationDto> {
    const cakes = await this.CakeRepository.findAll(page, limit, log, lat, knownfor, sortby, orderby);
    return cakes;
  }
}
