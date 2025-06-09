/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { GetAllOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_orders.usecase';
import { OrderDto } from 'src/common/dtos/Order.dto';
import { IGetAllOrdersInterface } from '../../../applicationLayer/interfaces/get-all-orders.interface';
/**
 * Injectable implementation class for the IGetStoreUseCase interface.
 * Delegates the store fetching operation to the injected getStoreUsecase service.
 */
@Injectable()
export class IGetAllOrdersImplimentation implements IGetAllOrdersInterface {
  constructor(private readonly getAllOrdersUseCase: GetAllOrdersUseCase) {}
  /**
   * Executes the use case to fetch store details by store_id.
   * @param store_id - The ID of the store to fetch.
   * @returns A Promise resolving to StoreDto containing store details.
   */
  async getallorders(): Promise<OrderDto[]> {
    return await this.getAllOrdersUseCase.execute();
  }
}
