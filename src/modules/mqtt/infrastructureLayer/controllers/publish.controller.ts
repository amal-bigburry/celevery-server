/**
 * importing the required packages
 */
import { Controller, Post, Body } from '@nestjs/common';
import { MqttService } from '../../applicationLayer/usecases/mqtt.usecase';
import { PopDto } from '../../dtos/pop.dto';
/**
 * controller to handle the pop request
 */
@Controller('pop')
export class MqttPublisherController {
  constructor(private readonly mqttService: MqttService) {}
  /**
   * post request
   */
  @Post('send')
  async sendMessage(@Body() popDto: PopDto) {
    await this.mqttService.publish(popDto);
    return 'Message published';
  }
}
