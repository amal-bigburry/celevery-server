import { IMqttService } from '../../applicationLayer/interfaces/MqttService.interface';
import { MqttPublisherController } from 'src/modules/mqtt/infrastructureLayer/controllers/publish.controller';

// @Injectable()
export class IMqttServiceImp implements IMqttService {
  constructor(
    private readonly mqttPublisherController: MqttPublisherController,
  ) {}
  async publish(data: any): Promise<string> {
    return await this.mqttPublisherController.sendMessage(data);
  }
}
