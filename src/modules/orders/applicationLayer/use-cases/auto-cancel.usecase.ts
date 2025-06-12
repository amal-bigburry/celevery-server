import IORedis from 'ioredis';
import { Worker } from 'bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { ChangeOrderStatusDto } from 'src/common/dtos/changeOrderStatus.dto';
import { ORDERINTERFACETOKEN } from '../../tokens/orderRepository.token';
import { OrderInterface } from '../interfaces/order.interface';
@Injectable()
export class AutoCancelWorker {
  private worker: Worker;
  constructor(
    @Inject(ORDERINTERFACETOKEN)
    private readonly OrderRepository: OrderInterface,
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
        let order = await this.OrderRepository.getOrderDetails(orderId) // This should be set based on your application logic    
        let data:ChangeOrderStatusDto = {
            user_id: order.buyer_id, // This should be set based on your application logic
            order_id: orderId,
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
