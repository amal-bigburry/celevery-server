/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { StoreDto } from 'src/common/dtos/store.dto';
import { GetStoreUsecase } from 'src/modules/stores/applicationLayer/usercases/get-store-details.usecase';
import { GetStoreInterface } from '../../../applicationLayer/interfaces/get-store.interface';
/**
 * Injectable implementation class for the IGetStoreUseCase interface.
 * Delegates the store fetching operation to the injected getStoreUsecase service.
 */
@Injectable()
export class GetStoreImplimentation implements GetStoreInterface {
  constructor(private readonly getstoreUsecase: GetStoreUsecase) {}
  /**
   * Executes the use case to fetch store details by store_id.
   * @param store_id - The ID of the store to fetch.
   * @returns A Promise resolving to StoreDto containing store details.
   */
  async getstore(store_id: string): Promise<StoreDto> {
    return await this.getstoreUsecase.execute(store_id);
  }
}
