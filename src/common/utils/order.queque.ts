import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(); // default localhost:6379

export const orderQueue = new Queue('auto-cancel-order', { connection });
