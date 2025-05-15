/**
 * importing required packages
 */
import { IGetAllPaymentWaitingOrdersUseCase } from '../../applicationLayer/interfaces/IGetAllPaymentWaitingOrdersUseCase.interface';
import { GetAllPaymentWaitingOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_all_payment_waiting_orders.usecase';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
import { Injectable } from '@nestjs/common';
/**
 * injectable file
 */
@Injectable()
export class IGetAllPaymentWaitingOrdersUsecaseImp
  implements IGetAllPaymentWaitingOrdersUseCase
{
  constructor(
    private readonly getAllPaymentWaitingOrdersUseCase: GetAllPaymentWaitingOrdersUseCase,
  ) {}
  execute(): Promise<Array<OrderDto>> {
    return this.getAllPaymentWaitingOrdersUseCase.execute();
  }
}
