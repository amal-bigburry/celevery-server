/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { IGetStoreUseCase } from '../../applicationLayer/interfaces/getStoreUsecase.interface';
import { StoreDto } from 'src/modules/stores/dtos/store.dto';
import { getStoreUsecase } from 'src/modules/stores/applicationLayer/usercases/getStore.usecase';

/**
 * Injectable implementation class for the IGetStoreUseCase interface.
 * Delegates the store fetching operation to the injected getStoreUsecase service.
 */
@Injectable()
export class GetStoreUsecaseImp implements IGetStoreUseCase {
  constructor(private readonly getStoreUsecase: getStoreUsecase) {}

  /**
   * Executes the use case to fetch store details by store_id.
   * @param store_id - The ID of the store to fetch.
   * @returns A Promise resolving to StoreDto containing store details.
   */
  execute(store_id: string): Promise<StoreDto> {
    return this.getStoreUsecase.execute(store_id);
  }
}
