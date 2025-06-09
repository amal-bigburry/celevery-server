import IORedis from 'ioredis';
import { Worker } from 'bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../interfaces/order.interface';
import { ChangeOrderStatusDto } from 'src/common/dtos/changeOrderStatus.dto';
import { GetOrderDetailsUseCase } from './get_order_details.usecase';
import { ORDER_REPOSITORY } from '../../tokens/orderRepository.token';

@Injectable()
export class AutoCancelWorker {
  private worker: Worker;

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly OrderRepository: OrderRepository,
    private readonly getorderdetails: GetOrderDetailsUseCase,
  ) {
    const redis = new IORedis({
      maxRetriesPerRequest: null,
    });
    console.log('Initializing BullMQ worker for auto-cancel orders...');
    this.worker = new Worker(
      'auto-cancel-order',
      async (job) => {
        const { orderId } = job.data;
        console.log(`Processing auto-cancel for Order ID: ${orderId}`);
        let order = await this.getorderdetails.execute(orderId) // This should be set based on your application logic    
        let data:ChangeOrderStatusDto = {
            user_id: order.buyer_id, // This should be set based on your application logic
            _id: orderId,
            new_status: 'CANCELLED',
        }

        try {
          await this.OrderRepository.changeStatusToCancel(data);
          console.log(`✅ Order ${orderId} status changed to cancelled`);
        } catch (err) {
          console.error(`❌ Failed to cancel Order ${orderId}:`, err);
        }
      },
      {
        connection: redis,
      },
    );

    console.log('✅ BullMQ worker for auto-cancel started');
  }
}
