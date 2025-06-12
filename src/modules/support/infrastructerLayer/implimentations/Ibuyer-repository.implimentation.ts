/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing essential decorators and classes from NestJS and Mongoose required for 
 * creating repository implementations that interact with MongoDB collections using Mongoose models.
 * Also imports domain entities, DTOs, and interfaces relevant to Buyer Support functionality.
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyerSupportEntity } from '../../domainLayer/entities/buyer.support.entity';
import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';
import { BuyerInterface } from '../../applicationLayer/interfaces/ibuyer-repository.interface';
import { BadRequestException, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class implements the IBuyerRepository interface providing the concrete methods 
 * to interact with the buyer support documents stored in MongoDB.
 * It uses dependency injection to receive the Mongoose model for buyerSupport collection.
 * Each method performs CRUD operations related to buyer support data while handling errors gracefully.
 */
@Injectable()
export class IBuyerRepositoryImp implements BuyerInterface {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Constructor injecting the Mongoose model instance for 'buyerSupport' collection.
 * This model instance is used internally to execute database queries and updates.
 */
  constructor(
    @InjectModel('buyerSupport')
    private buyerSupporttModel: Model<BuyerSupportEntity>,
  ) {}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Fetches all support document IDs associated with a given user ID.
 * This method queries the database for documents matching the user_id field,
 * then maps and returns the list of their stringified unique identifiers.
 */
  async fetchSupportIds(user_id: string): Promise<Array<string>> {
    const supports = await this.buyerSupporttModel.find({ user_id });
    return supports.map((support: any) => support._id.toString());
  }

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Retrieves the message array stored in the support document identified by support_id.
 * If no document is found, it throws a BadRequestException indicating invalid support ID.
 */
  async fetchMessages(support_id: string): Promise<Array<object>> {
    let support = await this.buyerSupporttModel.findById(support_id);
    if (support) return support?.message;
    else throw new BadRequestException('invalid support id');
  }

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Adds new messages to the existing message array in the support document identified by support_id.
 * It pushes the new messages received in the DTO to the document's messages array and saves the update.
 * If the support document does not exist, throws a BadRequestException.
 */
  async AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let support = await this.buyerSupporttModel.findById(
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
 * Creates a new buyer support document in the database with the given userId.
 * Initializes the messages array as empty and sets mqtt_topic to the userId.
 * After successful creation, returns a confirmation string 'created'.
 */
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
