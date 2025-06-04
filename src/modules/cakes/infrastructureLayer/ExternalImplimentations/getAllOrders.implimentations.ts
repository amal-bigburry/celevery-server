/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { IGetAllOrdersUseCase } from '../../applicationLayer/interfaces/getallorders.interface';
import { GetAllOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_orders.usecase';
import { OrderDto } from 'src/common/dtos/Order.dto';

/**
 * Injectable implementation class for the IGetStoreUseCase interface.
 * Delegates the store fetching operation to the injected getStoreUsecase service.
 */
@Injectable()
export class IGetAllOrdersUseCaseImp implements IGetAllOrdersUseCase {
  constructor(private readonly getAllOrdersUseCase: GetAllOrdersUseCase) {}
  /**
   * Executes the use case to fetch store details by store_id.
   * @param store_id - The ID of the store to fetch.
   * @returns A Promise resolving to StoreDto containing store details.
   */
  execute(): Promise<OrderDto[]> {
    return this.getAllOrdersUseCase.execute();
  }
}
