/**
 * importing required packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyerSupportEntity } from '../../domainLayer/entities/buyer.support.entity';
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';
import { IBuyerRepository } from '../../applicationLayer/interfaces/IBuyerRepository.interface';
import { BadRequestException } from '@nestjs/common';
/**
 * implimenting docuemt repository
 */

export class IBuyerRepositoryImp implements IBuyerRepository {
  constructor(
    @InjectModel('buyerSupport')
    private buyerSupporttModel: Model<BuyerSupportEntity>,
  ) {}
  async fetchSupportIds(user_id: string): Promise<Array<string>> {
    const supports = await this.buyerSupporttModel.find({ user_id })
    return supports.map((support: any) => support._id.toString());
  }
  async fetchMessages(support_id: string): Promise<Array<object>> {
    let support = await this.buyerSupporttModel.findById(support_id);
    if (support) return support?.message;
    else throw new BadRequestException('invalid support id');
  }
  async AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let support = await this.buyerSupporttModel.findById(
      MesssageSendDto.support_id,
    );
    support?.message?.push(MesssageSendDto.messages);
    support?.save();
    if (support) return support?.message;
    else throw new BadRequestException('invalid support id');
  }
  async create(userId: string): Promise<string> {
    let data = {
      user_id: userId,
      messages: [],
      mqtt_topic: userId,
    };
    await this.buyerSupporttModel.create(data);
    return 'created';
  }
}
