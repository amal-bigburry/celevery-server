/**
 * importing required packages
 * 
 * This section imports the necessary modules and classes required for retrieving a list of orders that are waiting for payment. 
 * The `IGetAllPaymentWaitingOrdersUseCase` interface defines the contract for fetching orders with payment pending, while 
 * the `GetAllPaymentWaitingOrdersUseCase` class contains the actual business logic for retrieving these orders. 
 * The `OrderDto` represents the data structure for an order and is used to define the format in which order information 
 * is returned. The `Injectable` decorator from NestJS is applied to this class to allow it to be injected as a service within 
 * other parts of the application.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { IGetAllPaymentWaitingOrdersUseCase } from '../../applicationLayer/interfaces/get-orders-waiting-to-pay.interface';
import { GetAllPaymentWaitingOrdersUseCase } from 'src/modules/orders/applicationLayer/use-cases/get-all-payment-waiting-orders.usecase';
import { OrderDto } from 'src/common/dtos/Order.dto';
import { Injectable } from '@nestjs/common';

/**
 * The `IGetAllPaymentWaitingOrdersUsecaseImp` class provides the implementation for the `IGetAllPaymentWaitingOrdersUseCase` 
 * interface. This class is responsible for interacting with the `GetAllPaymentWaitingOrdersUseCase` to retrieve orders that 
 * are still waiting for payment. It acts as a service in the application layer, calling the necessary use case and returning 
 * the result in the form of a promise that resolves to an array of `OrderDto` objects.
 * 
 * The `Injectable` decorator allows this service to be injected into other services or controllers that require access 
 * to the orders waiting for payment, ensuring that the application architecture adheres to the dependency injection pattern 
 * of NestJS.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class IGetAllPaymentWaitingOrdersUsecaseImp
  implements IGetAllPaymentWaitingOrdersUseCase
{
  constructor(
    private readonly getAllPaymentWaitingOrdersUseCase: GetAllPaymentWaitingOrdersUseCase,
  ) {}

  /**
   * The `execute` method in this class retrieves a list of orders that are currently waiting for payment. It calls the 
   * `GetAllPaymentWaitingOrdersUseCase` to fetch these orders and returns them as a promise. The result is an array of 
   * `OrderDto` objects that encapsulate the details of each order, such as order ID, buyer details, cake information, 
   * and the current payment status.
   * 
   * @returns Returns a promise that resolves to an array of `OrderDto` objects representing orders that are waiting for payment.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  execute(): Promise<Array<OrderDto>> {
    return this.getAllPaymentWaitingOrdersUseCase.execute();
  }
}
