/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This file defines the implementation of the INotificationUseCase interface.
 * The INotificationUseCaseImp class handles the interaction with the NotificationUseCase to send notifications.
 * It acts as a service layer that processes notification data and invokes the business logic to send notifications.
 * 
 * Dependencies:
 * - NotificationUseCase: The core business logic for sending notifications.
 * - INotificationUseCase: Interface that defines the contract for sending notifications.
 */
import { MqttPublisherController } from 'src/modules/mqtt/infrastructureLayer/controllers/publish.controller';
import { INotificationUseCase } from '../../applicationLayer/interfaces/notification.interface';
import { Injectable } from '@nestjs/common';
import { NotificationUseCase } from 'src/modules/Notifications/applicationLayer/usecases/notification.usecase';

/**
 * INotificationUseCaseImp class implements the INotificationUseCase interface.
 * It provides an implementation to send notifications by interacting with the NotificationUseCase.
 */
@Injectable()
export class INotificationUseCaseImp implements INotificationUseCase {

  /**
   * Constructor to inject the NotificationUseCase.
   * This use case is responsible for the core logic of sending notifications.
   */
  constructor(
    private readonly Notificationusecaes: NotificationUseCase,
  ) {}

  /**
   * Execute method that sends a notification with a given title, message, and token.
   * 
   * @param { title, message, token } The notification details to be sent.
   * @returns A promise that resolves to a string, typically indicating the status or result of the operation.
   */
  async execute({ title, message, token }: { title: any; message: any; token: any; }): Promise<string> {
    /**
     * Calls the execute method of NotificationUseCase to handle the business logic for sending the notification.
     * It returns a string response confirming the status of the notification being sent.
     */
    return await this.Notificationusecaes.execute({ title, message, token });
  }
}
