/**
 * importing the required packages
 */
import { IOrderRepository } from '../../applicationLayer/interfaces/IOrderRepository.interface';
import { GetAllOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_orders.usecase';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * Implimentation of order repository
 */
export class IOrderRepositoryImp implements IOrderRepository {
  constructor(private readonly getAllOrdersUseCase: GetAllOrdersUseCase) {}
  async findAll(): Promise<OrderDto[]> {
    return await this.getAllOrdersUseCase.execute();
  }
}
