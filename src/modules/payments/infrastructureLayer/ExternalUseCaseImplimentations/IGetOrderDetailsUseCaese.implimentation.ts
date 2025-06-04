/**
 * importing required packages
 * 
 * This section imports the necessary modules and classes required for retrieving detailed information about a specific order. 
 * The `OrderDto` is a data transfer object representing the structure of an order, encapsulating information such as order 
 * ID, buyer details, cake-related information, and the payment status. The `IGetOrderDetailsUseCaese` interface defines the 
 * contract for fetching the details of a specific order, while the `GetOrderDetailsUseCase` class contains the actual 
 * business logic for fetching those details. The `Injectable` decorator from NestJS is applied to this class to allow it 
 * to be injected as a service within other parts of the application.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { OrderDto } from 'src/common/dtos/Order.dto';
import { IGetOrderDetailsUseCaese } from '../../applicationLayer/interfaces/IGetOrderDetailsUseCaese.interface';
import { GetOrderDetailsUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_order_details.usecase';
import { Injectable } from '@nestjs/common';

/**
 * The `IGetOrderDetailsUseCaeseImp` class provides the implementation for the `IGetOrderDetailsUseCaese` interface. This class 
 * is responsible for interacting with the `GetOrderDetailsUseCase` to retrieve the details of a specific order based on the 
 * provided `order_id`. It acts as a service in the application layer, calling the necessary use case and returning the result 
 * in the form of a promise that resolves to an `OrderDto` object representing the details of the requested order.
 * 
 * The `Injectable` decorator allows this service to be injected into other services or controllers that require access 
 * to specific order details, ensuring that the application architecture adheres to the dependency injection pattern 
 * of NestJS.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class IGetOrderDetailsUseCaeseImp implements IGetOrderDetailsUseCaese {
  constructor(
    private readonly GetOrderDetailsUseCase: GetOrderDetailsUseCase,
  ) {}

  /**
   * The `execute` method in this class retrieves the details of a specific order based on the provided `order_id`. 
   * It calls the `GetOrderDetailsUseCase` to fetch the order details and returns the result as a promise that resolves to 
   * an `OrderDto` object containing information about the order, such as its ID, buyer details, cake details, and payment status.
   * 
   * @param order_id The ID of the order whose details are to be fetched.
   * @returns Returns a promise that resolves to an `OrderDto` object containing the details of the requested order.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  execute(order_id: string): Promise<OrderDto> {
    return this.GetOrderDetailsUseCase.execute(order_id);
  }
}
