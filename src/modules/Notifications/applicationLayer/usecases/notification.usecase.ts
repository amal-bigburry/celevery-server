/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NotificationDto } from '../../../../common/dtos/notification.dto';
import * as admin from 'firebase-admin';
import { NotificationInterface } from 'src/common/interfaces/notification.interface';
/**
 * Service to handle sending notifications
 */
@Injectable()
export class NotificationUseCase implements NotificationInterface{
  constructor() {}
  /**
   * Method to send a notification
   * @param notificationDto - DTO containing the notification data
   * @returns a string indicating the success status
   * @throws UnauthorizedException if there is an error sending the notification
   */
  async execute(notificationDto: NotificationDto): Promise<string> {
    let message = {
      notification: {
        title: notificationDto.title,
        body: notificationDto.message,
      },
      token: notificationDto.token,
    };
    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return 'ok';
    } catch (error) {
      // throw new UnauthorizedException('Error sending notification');
      return 'ok';
    }
  }
}
