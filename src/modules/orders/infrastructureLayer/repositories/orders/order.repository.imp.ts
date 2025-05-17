/**
 * import required packages
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
 * Implimenation of teh order repository interface
 */
export class OrderRepositoryImp implements OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDto>) {}

  async getOrderToAnalyse(level: number): Promise<OrderDto[]> {
    if (level == 1) {
      const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000);
      return await this.orderModel.find({
        createdAt: { $gte: sixtyMinutesAgo },
      }); // optional, for better performance
    } else if (level == 2) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
      return await this.orderModel.find({
        createdAt: { $gte: twentyFourHoursAgo },
      });
    } else if (level == 3) {
      const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000); // 4 days in milliseconds

      return await this.orderModel.find({
        createdAt: { $gte: fourDaysAgo },
      });
    } else if (level == 4) {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      return await this.orderModel.find({
        createdAt: { $gte: oneWeekAgo },
      });
    } else if (level == 5) {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // ~30 days
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

  async findAllPaymentWaitingOrders(): Promise<OrderDto[]> {
    let paymentWaitingOrders = await this.orderModel.find({
      order_status: ORDER_STATUS.WAITINGTOPAY,
    });
    return paymentWaitingOrders;
  }
  /**
   * Returns all the orders
   */
  async findAll(): Promise<OrderDto[]> {
    return await this.orderModel.find().exec();
  }
  /**
   * Creates order
   */
  async create(order: OrderDto): Promise<Object> {
    // console.log(order);
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }
  /**
   * Returns the orders that are ordered by the buyer
   */
  async findPlacedOrders(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto> {
    const skip = (page - 1) * limit;
    // console.log(user_id)
    const [data, total] = await Promise.all([
      this.orderModel
        .find({ user_id })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }) // optional: sort by newest orders
        .exec(),
      this.orderModel.countDocuments({ user_id }).exec(),
    ]);
    /**
     * Return the data
     */
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  /**
   * Returns the orders that are received as a seller
   */
  async findReceivedOrders(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<PaginationDto> {
    const skip = (page - 1) * limit;
    const filter = { seller_id: user_id };
    const [data, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }) // optional sorting
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
   * Returns the order using the order id
   */
  async findById(order_id: string): Promise<OrderDto> {
    let order = await this.orderModel.findById(order_id).exec();
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }

  async changeStatus(order_id: string, new_status: string): Promise<OrderDto> {
    /**
     * Verify that the new status is a valid status
     */
    if (!(new_status in ORDER_STATUS)) {
      throw new BadRequestException(
        'Error in Chanaging the status, new status is not Valid',
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
