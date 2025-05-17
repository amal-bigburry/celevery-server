/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file, 
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * Importing the required packages
 * Importing DTO, use case, interface and Injectable decorator
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
import { GetOrdersToAnalyse } from 'src/modules/orders/applicationLayer/use-cases/getOrderToAnalyse.usecase';
import { IGetOrdersToAnalyse } from '../../applicationLayer/interfaces/IGetOrdersToAnalyse.interface';
import { Injectable } from '@nestjs/common';
/**
 * An injectable implementation of IGetOrdersToAnalyse interface
 * Delegates execution to GetOrdersToAnalyse use case to fetch orders by level
 */
@Injectable()
export class IGetOrdersToAnalyseImp implements IGetOrdersToAnalyse {
  /**
   * Constructor injects GetOrdersToAnalyse use case dependency
   * @param getOrdersToAnalyse - Use case to get orders for analysis
   */
  constructor(private readonly getOrdersToAnalyse: GetOrdersToAnalyse) {}
  /**
   * Execute method calls GetOrdersToAnalyse execute method with level parameter
   * @param level - Level filter for fetching orders
   * @returns Promise resolving to array of OrderDto
   */
  async execute(level: number): Promise<OrderDto[]> {
    return await this.getOrdersToAnalyse.execute(level);
  }
}
