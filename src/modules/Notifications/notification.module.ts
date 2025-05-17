/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Module } from '@nestjs/common';
import { NotificationController } from './infrastructureLayer/controllers/notification.controller';
import { NotificationUseCase } from './applicationLayer/usecases/notification.usecase';

/**
 * Module for handling notifications
 */
@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationUseCase],
  exports: [NotificationUseCase],
})
export class NotificationModule {}
