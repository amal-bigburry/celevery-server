/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { IGetStoreUseCase } from '../../applicationLayer/interfaces/getStoreUsecase.interface';
import { StoreDto } from 'src/modules/stores/dtos/store.dto';
import { getStoreUsecase } from 'src/modules/stores/applicationLayer/usercases/getStore.usecase';
import { IGetPopularCakes } from '../../applicationLayer/interfaces/getPopularCakes.interface';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { GetPopularProductsUseCase } from 'src/modules/analytics/applicationLayer/usecases/GetPopularProducts.usecase';
import { GetPopularCakes } from 'src/common/utils/getPopularCakes';
import { promises } from 'dns';
import { GetAllOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_orders.usecase';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';

/**
 * Injectable implementation class for the IGetStoreUseCase interface.
 * Delegates the store fetching operation to the injected getStoreUsecase service.
 */
@Injectable()
export class IGetPopularCakesImp implements IGetPopularCakes {
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
