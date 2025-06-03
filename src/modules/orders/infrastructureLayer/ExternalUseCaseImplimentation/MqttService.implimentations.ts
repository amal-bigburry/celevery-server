/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This file defines the implementation of the IMqttService interface.
 * The IMqttServiceImp class provides functionality for publishing messages to an MQTT broker.
 * It interacts with the MqttPublisherController to send messages. The service is part of the application layer
 * that bridges the MQTT messaging infrastructure with the rest of the system.
 * 
 * Dependencies:
 * - MqttPublisherController: Handles the publishing of messages to the MQTT broker.
 * - IMqttService: Interface that defines the contract for MQTT messaging services.
 */
import { MqttService } from 'src/modules/mqtt/applicationLayer/usecases/mqtt.usecase';
import { IMqttService } from '../../applicationLayer/interfaces/MqttService.interface';
import { PopDto } from 'src/modules/mqtt/dtos/pop.dto';
import { Inject, Injectable } from '@nestjs/common';

/**
 * IMqttServiceImp class implements the IMqttService interface.
 * It provides an implementation for publishing messages via MQTT using the MqttPublisherController.
 */
@Injectable()
export class IMqttServiceImp implements IMqttService {

  /**
   * Constructor to inject the MqttPublisherController.
   * This controller is responsible for the logic of sending messages to the MQTT broker.
   */
  constructor(
    // @Inject(MQTTTOKEN)
    private readonly mqttService: MqttService,
  ) {}

  /**
   * Publish method that sends a message to the MQTT broker.
   * 
   * @param data The data to be sent as a message to the MQTT broker.
   * @returns A promise that resolves to a string, typically an acknowledgment or status message.
   */
  async publish(data: PopDto): Promise<string> {
    await this.mqttService.publish(data);
    // console.log('Message published:', data);
    return 'Message published';
  }
}
