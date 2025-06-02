/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { GetPopularCakes } from 'src/common/utils/getPopularCakes';
import { GetAllOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_orders.usecase';
import { IGetTrendingCakes } from '../../applicationLayer/interfaces/getTrendingCakes.interface';

/**
 * Injectable implementation class for the IGetStoreUseCase interface.
 * Delegates the store fetching operation to the injected getStoreUsecase service.
 */
@Injectable()
export class IGetTrendingCakesImp implements IGetTrendingCakes {
  constructor(private readonly GetAllOrdersUseCase: GetAllOrdersUseCase) {}

  /**
   * Executes the use case to fetch store details by store_id.
   * @param store_id - The ID of the store to fetch.
   * @returns A Promise resolving to StoreDto containing store details.
   */
  async execute(cakes: CakeEntity[]): Promise<CakeEntity[]> {
    // return this.getPopularProductsUseCase.execute(cakes);
    // let cake:CakeEntity[] = []
    let allorders = await this.GetAllOrdersUseCase.execute()
    return await GetPopularCakes(cakes,allorders)
  }
}
