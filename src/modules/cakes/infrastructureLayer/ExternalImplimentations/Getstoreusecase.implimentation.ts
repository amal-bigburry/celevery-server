/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { IGetStoreUseCase } from '../../applicationLayer/interfaces/getStoreUsecase.interface';
import { StoreDto } from 'src/modules/stores/Dtos/store.dto';
import { getStoreUsecase } from 'src/modules/stores/applicationLayer/usercases/getStore.usecase';
/**
 * injectable file
 */
@Injectable()
export class GetStoreUsecaseImp implements IGetStoreUseCase {
  constructor(private readonly getStoreUsecase: getStoreUsecase) {}
  execute(store_id: string): Promise<StoreDto> {
    return this.getStoreUsecase.execute(store_id);
  }
}
