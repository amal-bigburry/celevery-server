/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing necessary decorators and classes from NestJS and Mongoose for
 * implementing the repository layer to manage seller support documents in MongoDB.
 * Also importing domain entities, DTOs, interfaces, and exception handling utilities.
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISellerRepository } from '../../applicationLayer/interfaces/iseller-repository.interface';
import { SellerSupportEntity } from '../../domainLayer/entities/seller.support.entity';
import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class provides the concrete implementation of the ISellerRepository interface.
 * It encapsulates the logic to interact with the sellerSupport MongoDB collection using
 * the injected Mongoose model instance. All CRUD operations and validations are handled here.
 */
@Injectable()
export class ISellerRepositoryImp implements ISellerRepository {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Constructor injecting the Mongoose model for 'sellerSupport' collection.
 * This injected model is used internally to perform database queries and updates.
 */
  constructor(
    @InjectModel('sellerSupport')
    private sellerSupportModel: Model<SellerSupportEntity>,
  ) {}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Retrieves all support document IDs associated with the provided user_id.
 * Uses a query to find documents with matching user_id, returning an array of stringified _id values.
 */
  async fetchSupportIds(user_id: string): Promise<Array<string>> {
    const supports = await this.sellerSupportModel.find({ user_id }).lean();
    return supports.map((support: any) => support._id.toString());
  }

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Fetches the array of messages for a given support document identified by support_id.
 * Throws a BadRequestException if no matching support document is found.
 */
  async fetchMessages(support_id: string): Promise<Array<object>> {
    let support = await this.sellerSupportModel.findById(support_id);
    if (support) return support?.message;
    else throw new BadRequestException('invalid support id');
  }

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Adds new messages to the existing message array of the support document identified by support_id.
 * Pushes the new messages from the DTO and saves the updated document.
 * Throws a BadRequestException if the support document does not exist.
 */
  async AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let support = await this.sellerSupportModel.findById(
      MesssageSendDto.support_id,
    );
    support?.message?.push(MesssageSendDto.messages);
    support?.save();
    if (support) return support?.message;
    else throw new BadRequestException('invalid support id');
  }

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Creates a new seller support document with the given userId.
 * Initializes the messages array as empty and sets the mqtt_topic to userId.
 * Returns a string confirming creation upon success.
 */
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
