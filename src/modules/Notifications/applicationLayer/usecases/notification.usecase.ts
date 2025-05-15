import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NotificationDto } from '../../dtos/notification.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationUseCase {
  constructor() {}

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
      throw new UnauthorizedException('Error sending notification');
    }
  }
}
