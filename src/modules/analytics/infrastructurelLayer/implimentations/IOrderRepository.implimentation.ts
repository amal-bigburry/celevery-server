/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file, 
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * Importing the required packages
 * Importing interface, use case and DTO for orders
 */
/**
 * Implementation of IOrderRepository interface
 * Delegates findAll method to GetAllOrdersUseCase to retrieve all orders
 */
import { IOrderRepository } from '../../applicationLayer/interfaces/IOrderRepository.interface';
import { GetAllOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_orders.usecase';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
export class IOrderRepositoryImp implements IOrderRepository {
  /**
   * Constructor injects GetAllOrdersUseCase dependency
   * @param getAllOrdersUseCase - Use case to get all orders
   */
  constructor(private readonly getAllOrdersUseCase: GetAllOrdersUseCase) {}
  /**
   * findAll method calls use case to fetch all orders
   * @returns Promise resolving to array of OrderDto
   */
  async findAll(): Promise<OrderDto[]> {
    return await this.getAllOrdersUseCase.execute();
  }
}
