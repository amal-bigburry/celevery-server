//**
// importing the required packages */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
import { GetOrdersToAnalyse } from 'src/modules/orders/applicationLayer/use-cases/getOrderToAnalyse.usecase';
import { IGetOrdersToAnalyse } from '../../applicationLayer/interfaces/IGetOrdersToAnalyse.interface';
import { Injectable } from '@nestjs/common';
/**
 * A injectable file
 */
@Injectable()
export class IGetOrdersToAnalyseImp implements IGetOrdersToAnalyse {
  constructor(private readonly getOrdersToAnalyse: GetOrdersToAnalyse) {}
  async execute(level: number): Promise<OrderDto[]> {
    return await this.getOrdersToAnalyse.execute(level);
  }
}
