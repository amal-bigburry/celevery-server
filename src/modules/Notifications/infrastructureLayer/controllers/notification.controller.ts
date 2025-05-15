import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { NotificationUseCase } from '../../applicationLayer/usecases/notification.usecase';
import { NotificationDto } from '../../dtos/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationUseCase: NotificationUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async get_all_orders(@Body() notificationDto: NotificationDto) {
    return this.notificationUseCase.execute(notificationDto);
  }
}
