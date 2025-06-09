/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file,
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * Importing the required packages
 * Importing DTO, use case, interface and Injectable decorator
 */
import { Injectable } from '@nestjs/common';
import { IGetAllStoreInPlatformUsecase } from '../../applicationLayer/interfaces/get-all-stores-in-platform.interface';
import { StoreDto } from 'src/common/dtos/store.dto';
import { GetAllStoreInPlatformUsecase } from 'src/modules/stores/applicationLayer/usercases/get-all-store-in-platform.usecase';
/**
 * An injectable implementation of IGetOrdersToAnalyse interface
 * Delegates execution to GetOrdersToAnalyse use case to fetch orders by level
 */
@Injectable()
export class IGetAllStoreInPlatformUsecaseImp
  implements IGetAllStoreInPlatformUsecase
{
  constructor(
    private readonly getAllStoreInPlatform: GetAllStoreInPlatformUsecase,
  ) {}
  async execute(): Promise<Array<StoreDto>> {
    let stores = await this.getAllStoreInPlatform.execute();
    return stores
  }
}
