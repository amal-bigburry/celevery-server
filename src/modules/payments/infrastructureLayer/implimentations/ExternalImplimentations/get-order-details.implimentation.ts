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
import { IGetOrderDetailsUseCaese } from '../../../applicationLayer/interfaces/get-order-details.interface';
import { GetOrderDetailsUseCase } from 'src/modules/orders/applicationLayer/use-cases/get_order_details.usecase';
import { Injectable } from '@nestjs/common';
import { OrderDetailDto } from 'src/common/dtos/orderDetail.dto';
@Injectable()
export class IGetOrderDetailsUseCaeseImp implements IGetOrderDetailsUseCaese {
  constructor(
    private readonly GetOrderDetailsUseCase: GetOrderDetailsUseCase,
  ) {}
  /**
   * The `execute` method in this class retrieves the details of a specific order based on the provided `_id`. 
   * It calls the `GetOrderDetailsUseCase` to fetch the order details and returns the result as a promise that resolves to 
   * an `OrderDto` object containing information about the order, such as its ID, buyer details, cake details, and payment status.
   * 
   * @param _id The ID of the order whose details are to be fetched.
   * @returns Returns a promise that resolves to an `OrderDto` object containing the details of the requested order.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  execute(_id: string): Promise<OrderDetailDto> {
    return this.GetOrderDetailsUseCase.execute(_id);
  }
}
