/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common'; /**
 * Returns and injectable cake category
 */
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { IGetOrdersToAnalyse } from '../interfaces/IGetOrdersToAnalyse.interface';
import { GETORDERANALYSE } from '../../tokens/GetOrdersToAnalyse.token';
@Injectable()
export class GetTrendingProductsUseCase {
  constructor(
    @Inject(GETORDERANALYSE)
    private readonly getOrdersToAnalyse: IGetOrdersToAnalyse,
    // private readonly ICakeRepositoryUseCase: ICakeRepositoryUseCase,
  ) {}
  /**
   * function that execute the logic
   */
  async execute(page, limit): Promise<PaginationDto> {
    /**
     * trying level 1
     */
    // Orders came on last 60 minutes
    const orders = await this.getOrdersToAnalyse.execute(1);
    // Use a single loop to count and filter cakes that have count > 5
    let cakesAboveCriteria: CakeEntity[] = [];
    let cakeCountMap: { [key: string]: number } = {};
    for (const order of orders) {
      const cakeId = order.cake_id;
      // Update the count of each cake_id
      cakeCountMap[cakeId] = (cakeCountMap[cakeId] || 0) + 1;
      // If count exceeds 5, add to the result array (only if it's not already added)
      if (cakeCountMap[cakeId] === 6) {
        // We add it only when it reaches 6 (so it's added once)
        // let cakeswithdetails = await this.ICakeRepositoryUseCase.execute(cakeId);
        // cakesAboveCriteria.push(cakeswithdetails);
      }
    }
    const total = cakesAboveCriteria.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = cakesAboveCriteria.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
