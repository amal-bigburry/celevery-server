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
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import ORDER_STATUS from 'src/common/utils/contants';
import { OrderRepository } from 'src/modules/orders/applicationLayer/repositories/order.repositoty';
import { Order } from 'src/modules/orders/domainLayer/entities.ts/order.entity';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';

/**
 * OrderRepositoryImp implements the OrderRepository interface for interacting with the orders collection.
 * It provides methods to retrieve, create, update, and manipulate orders in the database.
 */
export class OrderRepositoryImp implements OrderRepository {
  /**
   * Constructor to inject the Mongoose Order model.
   * This model allows querying and manipulating orders in the MongoDB database.
   */
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDto>) {}

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
      order_status: ORDER_STATUS.WAITINGTOPAY,
    });
    return paymentWaitingOrders;
  }

  /**
   * Retrieves all orders in the database.
   * 
   * @returns A promise that resolves to an array of all orders.
   */
  async findAll(): Promise<OrderDto[]> {
    return await this.orderModel.find().exec();
  }

  /**
   * Creates a new order in the database.
   * 
   * @param order The OrderDto object containing the order data to be saved.
   * @returns A promise that resolves to the newly created order object.
   */
  async create(order: OrderDto): Promise<Object> {
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
    page: number = 1,
    limit: number = 1,
  ): Promise<PaginationDto> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.orderModel
        .find({buyer_id: user_id })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments({ buyer_id: user_id }).exec(),
    ]);
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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
    page: number = 1,
    limit: number = 1,
  ): Promise<PaginationDto> {
    
    // console.log(user_id)
    const skip = (page - 1) * limit;
    const filter = { seller_id: user_id };
    const [data, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Retrieves an order using the order ID.
   * 
   * @param order_id The ID of the order to fetch.
   * @returns A promise that resolves to the order object.
   * @throws BadRequestException if the order is not found.
   */
  async findById(order_id: string): Promise<OrderDto> {
    let order = await this.orderModel.findById(order_id).exec();
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }

  /**
   * Changes the status of a specific order.
   * 
   * @param order_id The ID of the order to update.
   * @param new_status The new status to set for the order.
   * @returns A promise that resolves to the updated order.
   * @throws BadRequestException if the new status is invalid or the order is not found.
   */
  async changeStatus(order_id: string, new_status: string): Promise<OrderDto> {
    if (!(new_status in ORDER_STATUS)) {
      throw new BadRequestException(
        'Error in changing the status, new status is not valid',
      );
    }
    let order = await this.orderModel
      .findByIdAndUpdate(order_id, { order_status: new_status }, { new: true })
      .exec();

    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }
}
