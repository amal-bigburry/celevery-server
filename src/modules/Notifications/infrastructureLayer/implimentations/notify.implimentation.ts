/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing required packages and interfaces to implement the notification mechanism
 * for seller support system. This implementation will use an MQTT service to publish
 * notification messages to relevant topics.
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SellerSupportEntity } from '../../../support/domainLayer/entities/seller.support.entity';
import { Injectable } from '@nestjs/common';
import { Notify } from '../../../support/applicationLayer/interfaces/notify.interface';
import { MqttService } from 'src/modules/mqtt/applicationLayer/usecases/mqtt.usecase';
import { PopDto } from 'src/common/dtos/pop.dto';

/**
 * Company: Bigburry Hypersystems LLP
 *
 * NotifyImp class implements the Notify interface to send notifications
 * via MQTT whenever there is an update in the support messages.
 * It publishes a simple "update" message to the provided MQTT topic.
 */
@Injectable()
export class NotifyImp implements Notify {
  constructor(
    private readonly MqttService: MqttService,
  ) {}

  /**
   * Sends a notification to seller subscribers on the given MQTT topic.
   * @param topic - MQTT topic to publish the notification message to.
   * @returns string confirmation of notification sent.
   */
  async seller(topic: string): Promise<string> {
    const notifydata: PopDto = {
      message: 'update',
      topic: topic,
    };
    this.MqttService.publish(notifydata);
    return 'send';
  }

  /**
   * Sends a notification to buyer subscribers on the given MQTT topic.
   * @param topic - MQTT topic to publish the notification message to.
   * @returns string confirmation of notification sent.
   */
  async buyer(topic: string): Promise<string> {
    const notifydata: PopDto = {
      message: 'update',
      topic: topic,
    };
    this.MqttService.publish(notifydata);
    return 'send';
  }
}
