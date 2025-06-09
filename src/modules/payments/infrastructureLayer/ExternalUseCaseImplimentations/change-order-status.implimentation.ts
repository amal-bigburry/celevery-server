/**
 * importing required packages
 * 
 * This section imports the necessary dependencies for handling the order status change functionality. The `Injectable`
 * decorator from NestJS is used to mark this service as injectable for dependency injection. The `IChangeOrderStatusUseCase`
 * interface defines the contract for changing the status of an order, while the `ChangeOrderStatusUseCase` contains the 
 * actual business logic for updating the status. The `OrderDto` is the data transfer object that represents the structure
 * of the order being modified.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { Injectable } from '@nestjs/common';
import { IChangeOrderStatusUseCase } from '../../applicationLayer/interfaces/change-order-status.interface';
import { ChangeOrderStatusUseCase } from 'src/modules/orders/applicationLayer/use-cases/change-order-status.usecase';
import { OrderDto } from '../../../../common/dtos/Order.dto';

/**
 * The `IChangeOrderStatusUseCaseImp` class provides the concrete implementation of the `IChangeOrderStatusUseCase` interface,
 * and it is responsible for executing the process of changing the status of an order. It relies on the `ChangeOrderStatusUseCase`
 * to perform the actual operation of updating the order's status.
 * 
 * The class is decorated with the `@Injectable()` decorator, which allows it to be injected into other services or controllers
 * within the NestJS framework. This service is part of the application layer and communicates with other components to update
 * the order's status based on the provided input.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class IChangeOrderStatusUseCaseImp implements IChangeOrderStatusUseCase {
  constructor(
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
  ) {}

  /**
   * The `execute` method of this class accepts an `updatedstatus` object, which represents the new status to be applied to
   * the order. This method delegates the task of updating the order's status to the `ChangeOrderStatusUseCase` class.
   * Once the status change operation is completed, the method returns a promise that resolves to an updated `OrderDto`,
   * which contains the latest state of the order after the status change.
   * 
   * @param updatedstatus The object containing the new status and related order information to update the order.
   * @returns Returns a promise that resolves to the updated `OrderDto`, reflecting the new order status.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  execute(updatedstatus): Promise<OrderDto> {
    return this.changeOrderStatusUseCase.execute(updatedstatus);
  }
}
