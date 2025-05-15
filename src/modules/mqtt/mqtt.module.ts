/**
 * importing the required packages
 */
import { Module } from '@nestjs/common';
import { MqttPublisherController } from './infrastructureLayer/controllers/publish.controller';
import { MqttService } from './applicationLayer/usecases/mqtt.usecase';
/**
 * module
 */
@Module({
  imports: [],
  controllers: [MqttPublisherController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
