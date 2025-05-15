import { MqttPublisherController } from 'src/modules/mqtt/infrastructureLayer/controllers/publish.controller';
import { INotificationUseCase } from '../../applicationLayer/interfaces/NotificationUsecase.interface';
import { Injectable } from '@nestjs/common';
import { NotificationUseCase } from 'src/modules/Notifications/applicationLayer/usecases/notification.usecase';

@Injectable()
export class INotificationUseCaseImp implements INotificationUseCase {
  constructor(
    private readonly Notificationusecaes: NotificationUseCase,
  ) {}
    async execute({ title, message, token }: { title: any; message: any; token: any; }): Promise<string> {
        return await this.Notificationusecaes.execute({title, message,token})
    }
}
