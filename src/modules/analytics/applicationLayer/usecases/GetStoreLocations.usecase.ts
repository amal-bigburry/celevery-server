/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file,
 * via any medium is strictly prohibited. Proprietary and confidential.
 */

/**
 * Importing Required Packages
 * This section imports necessary decorators, interfaces, data transfer objects (DTOs),
 * tokens for dependency injection, domain entities representing cakes and orders,
 * and configuration service used to access environment variables.
 */
import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { IGetOrdersToAnalyse } from '../interfaces/IGetOrdersToAnalyse.interface';
import { IGetCakeDetailsUseCase } from 'src/modules/orders/applicationLayer/interfaces/GetCakeDetailsusecase.interface';
import { GETORDERANALYSE } from '../../tokens/GetOrdersToAnalyse.token';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { CAKEREPOSITORY } from '../../tokens/cake_Repository.token';
import { OrderDto } from 'src/common/dtos/Order.dto';
import { ConfigService } from '@nestjs/config';
import { IGetAllStoreInPlatformUsecase } from '../interfaces/IGetAllStoreInPlatformUsecase.interface';
import { GETALLSTOREINPLATFORM } from '../../tokens/Getallstorelocation.token';

/**
 * Use case class to get trending products based on order analysis across multiple analysis levels.
 *
 * This injectable service aggregates cake orders by analyzing orders at multiple levels,
 * counts occurrences of each cake, filters cakes based on a minimum quantity threshold,
 * and returns paginated results of trending cakes.
 *
 * It halts further analysis when the number of trending cakes exceeds a configured threshold.
 *
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
@Injectable()
export class GetStoreLocationsUsecase {
  constructor(
    private readonly configService: ConfigService,
    @Inject(GETALLSTOREINPLATFORM)
    private readonly GetAllStoreInPlatformUsecase: IGetAllStoreInPlatformUsecase,
  ) {}
  async execute(page: number, limit: number) {
    let stores = await this.GetAllStoreInPlatformUsecase.execute();
    let finalstores: {
      lat: number;
      log: number;
      store_name: string;
      store_id:string;
    }[] = [];
    stores.map((store) => {
      finalstores.push({ lat: store.lat, log: store.log , store_name:store.store_name, store_id: store._id});
    });
    const total = finalstores.length;
    /**
     * Compute total number of pages for pagination based on limit.
     */
    const totalPages = Math.ceil(total / limit);
    /**
     * Calculate start and end indices for slicing paginated results.
     */
    const start = (page - 1) * limit;
    const end = start + limit;
    /**
     * Slice detailed cake data for the requested pagination page.
     */
    const paginatedData = finalstores.slice(start, end);
    /**
     * Return a PaginationDto containing paginated trending cake data and pagination metadata.
     */
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
