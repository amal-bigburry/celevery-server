/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { MqttService } from '../../applicationLayer/usecases/mqtt.usecase';
import { PopDto } from '../../../../common/dtos/pop.dto';
/**
 * controller to handle the pop request
 */
@Controller('pop')
export class MqttPublisherController {
  constructor(private readonly mqttService: MqttService) {}
  /**
   * post request to send message
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('send')
  async sendMessage(@Body() popDto: PopDto) {
    await this.mqttService.publish(popDto);
    return 'Message published';
  }
}
