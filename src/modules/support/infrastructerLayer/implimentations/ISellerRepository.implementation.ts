/**
 * importing required packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISellerRepository } from '../../applicationLayer/interfaces/ISellerRepository.interface';
import { SellerSupportEntity } from '../../domainLayer/entities/seller.support.entity';
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';
import { BadRequestException } from '@nestjs/common';
/**
 * implimenting docuemt repository
 */
export class ISellerRepositoryImp implements ISellerRepository {
  constructor(
    @InjectModel('sellerSupport')
    private sellerSupportModel: Model<SellerSupportEntity>,
  ) {}
  async fetchSupportIds(user_id: string): Promise<Array<string>> {
    const supports = await this.sellerSupportModel.find({ user_id }).lean();
    return supports.map((support: any) => support._id.toString());
  }
  async fetchMessages(support_id: string): Promise<Array<object>> {
    let support = await this.sellerSupportModel.findById(support_id);
    if (support)return support?.message;
    else throw new BadRequestException('invalid support id')
  }
  async AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let support = await this.sellerSupportModel.findById(
      MesssageSendDto.support_id,
    );
    support?.message?.push(MesssageSendDto.messages);
    support?.save();
    if(support)return support?.message;
    else throw new BadRequestException('invalid support id')
  }
  async create(userId: string): Promise<string> {
    let data = {
      user_id: userId,
      messages: [],
      mqtt_topic: userId,
    };
    await this.sellerSupportModel.create(data);
    return 'created';
  }
}
