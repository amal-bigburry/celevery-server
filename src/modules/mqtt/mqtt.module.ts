/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Module } from '@nestjs/common';
import { MqttPublisherController } from './infrastructureLayer/controllers/publish.controller';
import { MqttService } from './applicationLayer/usecases/mqtt.usecase';
/**
 * module definition for mqtt handling
 */
@Module({
  imports: [],
  controllers: [MqttPublisherController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
