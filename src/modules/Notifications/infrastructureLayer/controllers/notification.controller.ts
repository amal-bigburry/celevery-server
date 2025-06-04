/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { NotificationUseCase } from '../../applicationLayer/usecases/notification.usecase';
import { NotificationDto } from '../../../../common/dtos/notification.dto';

/**
 * Controller to handle notification-related routes
 */
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationUseCase: NotificationUseCase) {}

  /**
   * POST route to send a notification
   * @param notificationDto - DTO containing notification data
   * @returns the result of sending the notification
   */

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard)
  async get_all_orders(@Body() notificationDto: NotificationDto) {
    return this.notificationUseCase.execute(notificationDto);
  }
}
