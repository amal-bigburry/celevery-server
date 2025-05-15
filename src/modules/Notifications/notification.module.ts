import { Module } from '@nestjs/common';
import { NotificationController } from './infrastructureLayer/controllers/notification.controller';
import { NotificationUseCase } from './applicationLayer/usecases/notification.usecase';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationUseCase],
  exports:[NotificationUseCase]
})
export class NotificationModule {}
