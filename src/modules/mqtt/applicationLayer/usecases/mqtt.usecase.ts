/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * imports the required packages
 */
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { PopDto } from '../../../../common/dtos/pop.dto';
import { ConfigService } from '@nestjs/config';
import { MqttServiceInterface } from 'src/common/interfaces/mqtt-service.interface';
/**
 * Injectable service file to implement mqttservice
 */
@Injectable()
export class MqttService implements OnModuleInit,MqttServiceInterface {
  constructor(private readonly configService: ConfigService) {}
  private client: ClientProxy;
  /**
   * Initializes the MQTT client
   */
  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: `${this.configService.get<string>('MQTT_SERVER')}`,
      },
    });
  }
  /**
   * function to publish the message
   */
  async publish(popDto: PopDto) {
    this.client.emit(popDto.topic, popDto.message).subscribe({
      next: () => console.log('✅ Message published'),
      error: (err) => console.error('❌ Publish error', err),
    });
    
    return 'published'
  }
}
