/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { IChangeOrderStatusUseCase } from '../../applicationLayer/interfaces/IChangeOrderStatusUseCase.interface';
import { ChangeOrderStatusUseCase } from 'src/modules/orders/applicationLayer/use-cases/change_order_status.usecase';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
/**
 * injectable file
 */
@Injectable()
export class IChangeOrderStatusUseCaseImp implements IChangeOrderStatusUseCase {
  constructor(
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
  ) {}
  execute(updatedstatus): Promise<OrderDto> {
    return this.changeOrderStatusUseCase.execute(updatedstatus);
  }
}
