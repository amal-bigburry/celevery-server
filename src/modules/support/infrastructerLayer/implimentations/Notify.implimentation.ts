/**
 * importing required packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISellerRepository } from '../../applicationLayer/interfaces/ISellerRepository.interface';
import { SellerSupportEntity } from '../../domainLayer/entities/seller.support.entity';
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';
import { BadRequestException } from '@nestjs/common';
import { Notify } from '../../applicationLayer/interfaces/Notify.interface';
import { MqttService } from 'src/modules/mqtt/applicationLayer/usecases/mqtt.usecase';
import { PopDto } from 'src/modules/mqtt/dtos/pop.dto';
/**
 * implimenting docuemt repository
 */
export class NotifyImp implements Notify {
  constructor(
    @InjectModel('sellerSupport')
    private sellerSupportModel: Model<SellerSupportEntity>,
    private readonly MqttService: MqttService,
  ) {}
    async seller(topic: string): Promise<string> {
        let notifydata:PopDto = {
            message:"update",
            topic:topic
        }
        this.MqttService.publish(notifydata)
        return 'send'
    }

    async buyer(topic: string): Promise<string> {
        let notifydata:PopDto = {
            message:"update",
            topic:topic
        }
        this.MqttService.publish(notifydata)
        return 'send'
    }
}
