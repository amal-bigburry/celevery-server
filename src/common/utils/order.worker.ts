import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import mongoose from 'mongoose';


const connection = new IORedis();
mongoose.connect('mongodb://localhost:27017/your-db-name');

const OrderModel = mongoose.model('Order', new mongoose.Schema({
  status: String,
}, { timestamps: true }));

new Worker('auto-cancel-order', async (job) => {
  const { orderId } = job.data;
  const order = await OrderModel.findById(orderId);

  if (order && order.status === 'REQUESTED') {
    order.status = 'CANCELLED';
    await order.save();
    console.log(`Order ${orderId} auto-cancelled`);
  }
}, { connection });
