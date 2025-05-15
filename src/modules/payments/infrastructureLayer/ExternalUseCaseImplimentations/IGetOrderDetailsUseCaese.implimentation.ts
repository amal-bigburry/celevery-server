/**
 * importing required packages
 */
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
import { IGetOrderDetailsUseCaese } from '../../applicationLayer/interfaces/IGetOrderDetailsUseCaese.interface';
import { GetOrderDetailsUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_order_details.usecase';
import { Injectable } from '@nestjs/common';
/**
 * injectable flle
 */
@Injectable()
export class IGetOrderDetailsUseCaeseImp implements IGetOrderDetailsUseCaese {
  constructor(
    private readonly GetOrderDetailsUseCase: GetOrderDetailsUseCase,
  ) {}
  execute(order_id: string): Promise<OrderDto> {
    return this.GetOrderDetailsUseCase.execute(order_id);
  }
}
