/**
 * Company License: Bigburry Hypersystems LLP
 *
 * This file defines the implementation of the OrderRepository interface.
 * The OrderRepositoryImp class provides methods for interacting with the orders collection in the database.
 * These methods are used to perform operations like retrieving orders, creating new orders,
 * updating the status of an order, and querying orders based on specific conditions.
 *
 * Dependencies:
 * - OrderModel: Mongoose model representing orders in the database.
 * - ORDER_STATUS: Enum or constant representing different order statuses.
 * - PaginationDto: Data Transfer Object (DTO) for handling pagination of order lists.
 * - OrderDto: Data Transfer Object for Order, used to represent order data.
 *
 * The class implements methods for filtering, updating, and retrieving orders with different criteria.
 */
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ORDER_STATUS } from 'src/common/utils/contants';
import { Order } from 'src/modules/orders/domainLayer/entities.ts/order.entity';
import { OrderDto } from 'src/common/dtos/Order.dto';
import { GETUSERDETAILINTERFACETOKEN } from 'src/modules/orders/tokens/get_user_details.token';
import { NOTIFICATIONINTERFACETOKEN } from 'src/modules/orders/tokens/notificationusecase.token';
import { ChangeOrderStatusDto } from 'src/common/dtos/changeOrderStatus.dto';
import { PopDto } from 'src/common/dtos/pop.dto';
import { CAKEDETAILINTERFACETOKEN } from 'src/modules/orders/tokens/get_cake_details.token';
import { MQTTTOKEN } from 'src/modules/orders/tokens/mqtt.token';
import { IGetStoreUseCase } from 'src/modules/cakes/applicationLayer/use-cases/get-store.usecase';
import { GETSTOREINTERFACETOKEN } from 'src/modules/orders/tokens/get_store_details.token';
import { OrderInterface } from 'src/modules/orders/applicationLayer/interfaces/order.interface';
import { NotificationInterface } from 'src/modules/orders/applicationLayer/interfaces/notification.interface';
import { GetUserDetailInterface } from 'src/modules/orders/applicationLayer/interfaces/get-user-details.interface';
import { CakeDetailsInterface } from 'src/modules/orders/applicationLayer/interfaces/get-cake-details.interface';
import { MqttServiceInterface } from 'src/modules/orders/applicationLayer/interfaces/mqtt-service.interface';
import { GetstoreInterface } from 'src/modules/orders/applicationLayer/interfaces/get-store.interface';
/**
 * OrderRepositoryImp implements the OrderRepository interface for interacting with the orders collection.
 * It provides methods to retrieve, create, update, and manipulate orders in the database.
 */
export class OrderRepositoryImp implements OrderInterface {
  /**
   * Constructor to inject the Mongoose Order model.
   * This model allows querying and manipulating orders in the MongoDB database.
   */
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDto>,
    @Inject(NOTIFICATIONINTERFACETOKEN)
    private readonly notificationUseCase: NotificationInterface,
    @Inject(GETUSERDETAILINTERFACETOKEN)
    private readonly IGetUserDetailUseCase: GetUserDetailInterface,
    @Inject(CAKEDETAILINTERFACETOKEN)
    private readonly getCakeDetailsUseCase: CakeDetailsInterface,
    @Inject(GETSTOREINTERFACETOKEN)
    private readonly getStoreUsecase: GetstoreInterface,
    @Inject(MQTTTOKEN)
    private readonly mqttService: MqttServiceInterface,
  ) {}
  /**
   * Retrieves the details of a specific order by its ID.
   *
   * @param _id The ID of the order to retrieve.
   * @returns A promise that resolves to the OrderDto object.
   * @throws BadRequestException if the order is not found.
   */
  async getOrderDetails(_id: string): Promise<OrderDto> {
    const order = await this.orderModel.findById(_id).exec();
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }
  /**
   * Changes the status of an order to 'CANCELLED' and notifies the buyer and seller.
   * @param data ChangeOrderStatusDto containing _id and reason for cancellation.
   * @returns The updated OrderDto.
   * @throws BadRequestException if the order is not found.
   */
  async changeStatusToCancel(data: ChangeOrderStatusDto): Promise<OrderDto> {
    const { _id, cancellation_reason } = data;
    const order = await this.orderModel
      .findByIdAndUpdate(
        _id,
        {
          order_status: ORDER_STATUS.CANCELLED,
          cancellation_reason: cancellation_reason,
        },
        { new: true },
      )
      .exec();
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    let cake = await this.getCakeDetailsUseCase.getcakedetail(order.cake_id);
    // Validate if the cake exists
    if (!cake) throw new UnauthorizedException('Cake not found');
    const buyer = await this.IGetUserDetailUseCase.getuserdetail(
      order.buyer_id,
    );
    const seller = await this.IGetUserDetailUseCase.getuserdetail(
      order.seller_id,
    );
    let mqttdata: PopDto = {
      topic: seller._id,
      message: `{"type": "cancel_order", "data": "${_id}"}`,
    };
    await this.mqttService.publish(mqttdata);
    // Notify buyer
    await this.notificationUseCase.execute({
      title: 'Order Cancelled',
      message: `Your order has been cancelled. Reason: ${cancellation_reason}`,
      token: buyer.fcm_token,
    });
    // Notify seller
    await this.notificationUseCase.execute({
      title: 'Order Cancelled',
      message: `An order has been cancelled. Reason: ${cancellation_reason}`,
      token: seller.fcm_token,
    });
    return order;
  }
  /**
   * Retrieves orders based on the specified analysis level, filtering by the order's creation date.
   *
   * @param level The level of analysis to filter orders (1, 2, 3, 4, 5, 0).
   * @returns A promise that resolves to an array of orders matching the criteria.
   */
  async getOrderToAnalyse(level: number): Promise<OrderDto[]> {
    if (level == 1) {
      const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);
      return await this.orderModel.find({
        createdAt: { $gte: sixtyMinutesAgo },
      });
    } else if (level == 2) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return await this.orderModel.find({
        createdAt: { $gte: twentyFourHoursAgo },
      });
    } else if (level == 3) {
      const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
      return await this.orderModel.find({
        createdAt: { $gte: fourDaysAgo },
      });
    } else if (level == 4) {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return await this.orderModel.find({
        createdAt: { $gte: oneWeekAgo },
      });
    } else if (level == 5) {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return await this.orderModel.find({
        createdAt: { $gte: oneMonthAgo },
      });
    } else if (level == 0) {
      return await this.orderModel.find();
    } else {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return await this.orderModel.find({
        createdAt: { $gte: oneYearAgo },
      });
    }
  }
  /**
   * Fetches orders that are currently waiting for payment.
   *
   * @returns A promise that resolves to an array of orders with the status 'WAITINGTOPAY'.
   */
  async findAllPaymentWaitingOrders(): Promise<OrderDto[]> {
    let paymentWaitingOrders = await this.orderModel.find({
      order_status: ORDER_STATUS.WAITING_TO_PAY,
    });
    return paymentWaitingOrders;
  }
  /**
   * Retrieves all orders in the database.
   *
   * @returns A promise that resolves to an array of all orders.
   */
  async findAll(): Promise<OrderDto[]> {
    return await this.orderModel.find();
  }
  /**
   * Creates a new order in the database.
   *
   * @param order The OrderDto object containing the order data to be saved.
   * @returns A promise that resolves to the newly created order object.
   */
  async create(order: OrderDto): Promise<OrderDto> {
    // console.log(order)
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }
  /**
   * Retrieves the orders placed by a specific buyer.
   *
   * @param user_id The ID of the buyer.
   * @param page The page number for pagination.
   * @param limit The number of orders to return per page.
   * @returns A promise that resolves to a PaginationDto containing the placed orders.
   */
  async findPlacedOrders(
    user_id: string,
  ): Promise<object[]> {
    const [orders, total] = await Promise.all([
      this.orderModel
        .find({ buyer_id: user_id })
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments({ buyer_id: user_id }).exec(),
    ]);
    let finalPlacedOrders = (
      await Promise.all(
        orders.map(async (order) => {
          const cake = await this.getCakeDetailsUseCase.getcakedetail(
            order.cake_id,
          );
          if (!cake) return null;
          const store = await this.getStoreUsecase.getstore(cake.store_id);
          if (!store) return null;
          const user = await this.IGetUserDetailUseCase.getuserdetail(user_id);
          if (!user) return null;
          return {
            cake_id: cake._id,
            cake_image_url: cake.cake_image_urls[0],
            cake_name: cake.cake_name,
            _id: order.id, // Probably meant cake.name instead?
            order_date: new Date(order.createdAt),
            cake_price: cake.cake_variants[0].cake_price,
            cake_mrp: cake.cake_variants[0].cake_mrp,
            cake_description: cake.cake_description,
            order_status: order.order_status,
            total_amount: cake.cake_variants[0].cake_price,
            store_id:cake.store_id,
            store_name:store.store_name,
            createdAt: new Date(),
          };
        }),
      )
    ).filter((item) => item !== null);
    // console.log(finalPlacedOrders);
    return finalPlacedOrders
    
  }
  /**
   * Retrieves the orders received by a specific seller.
   *
   * @param user_id The ID of the seller.
   * @param page The page number for pagination.
   * @param limit The number of orders to return per page.
   * @returns A promise that resolves to a PaginationDto containing the received orders.
   */
  async findReceivedOrders(
    user_id: string,
    store_id: string,
  ): Promise<object[]> {
    const filter = { seller_id: user_id, store_id: store_id };
    const [orders, total] = await Promise.all([
      this.orderModel.find(filter).sort({ createdAt: -1 }).exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);
    let finalReceivedOrders = (
      await Promise.all(
        orders.map(async (order) => {
          const cake = await this.getCakeDetailsUseCase.getcakedetail(
            order.cake_id,
          );
          if (!cake) return null;
          const store = await this.getStoreUsecase.getstore(cake.store_id);
          if (!store) return null;
          const user = await this.IGetUserDetailUseCase.getuserdetail(user_id);
          if (!user) return null;
          return {
            cake_id: cake._id,
            cake_image_url: cake.cake_image_urls[0],
            cake_name: cake.cake_name,
            _id: order.id, // Probably meant cake.name instead?
            order_date: new Date(order.createdAt),
            cake_price: cake.cake_variants[0].cake_price,
            cake_mrp: cake.cake_variants[0].cake_mrp,
            cake_description: cake.cake_description,
            order_status: order.order_status,
            total_amount: cake.cake_variants[0].cake_price,
            createdAt: new Date(),
          };
        }),
      )
    ).filter((item) => item !== null);
    return finalReceivedOrders;
  }
  /**
   * Retrieves an order using the order ID.
   *
   * @param _id The ID of the order to fetch.
   * @returns A promise that resolves to the order object.
   * @throws BadRequestException if the order is not found.
   */
  async findById(_id: string): Promise<OrderDto> {
    let order = await this.orderModel.findById(_id).exec();
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }
  /**
   * Changes the status of a specific order.
   *
   * @param _id The ID of the order to update.
   * @param new_status The new status to set for the order.
   * @returns A promise that resolves to the updated order.
   * @throws BadRequestException if the new status is invalid or the order is not found.
   */
  async changeStatus(_id: string, new_status: string): Promise<OrderDto> {
    if (!(new_status in ORDER_STATUS)) {
      throw new BadRequestException(
        'Error in changing the status, new status is not valid',
      );
    }
    let order = await this.orderModel
      .findByIdAndUpdate(_id, { order_status: new_status }, { new: true })
      .exec();
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    let seller_id = order.seller_id; // Assuming seller_id is available in the order object
    let buyer_id = order.buyer_id;
    let buyer = await this.IGetUserDetailUseCase.getuserdetail(buyer_id); // Assuming buyer_id is available in the order object
    let seller = await this.IGetUserDetailUseCase.getuserdetail(seller_id); // Assuming buyer_id is available in the order object
    // console.log('Order status of', _id, 'changed to:', new_status);
    // Notify buyer about the order status change
    await this.notificationUseCase.execute({
      title: 'Order Status Changed',
      message: 'Your order status has been changed to ' + new_status,
      token: buyer.fcm_token, // Assuming buyer_token is available in the order object
    });
    // Notify buyer about the order status change
    await this.notificationUseCase.execute({
      title: 'Order Status Changed',
      message: 'Your order status has been changed to ' + new_status,
      token: seller.fcm_token, // Assuming buyer_token is available in the order object
    });
    return order;
  }
}
