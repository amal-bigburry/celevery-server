/**
 * imports the required packages
 */
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { PopDto } from '../../dtos/pop.dto';
import { ConfigService } from '@nestjs/config';
/**
 * Injectable service file to impliment mqttservice
 */
@Injectable()
export class MqttService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  private client: ClientProxy;
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
  }
}
