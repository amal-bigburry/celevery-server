/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the core NestJS dependency injection utilities.
 * @Inject is used for injecting specific implementations or constants.
 * @Injectable marks the class as a provider that can be injected into other classes via NestJS’s dependency injection system.
 * These are critical for constructing loosely-coupled and testable services in the NestJS framework.
 */
import { Inject, Injectable } from '@nestjs/common';
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';
import { BuyerInterface } from '../interfaces/ibuyer-repository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This annotation marks the class as injectable, allowing it to participate in NestJS’s dependency injection system.
 * It is a standard decorator used to register service classes as providers in the NestJS application architecture.
 * This service is responsible for adding new support messages to the buyer support communication system.
 */
@Injectable()
export class AddMessageToBuyerSupportUsecase {
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerInterface: BuyerInterface,
  ) {}
  async execute(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let Messages = await this.BuyerInterface.AddMessage(MesssageSendDto);
    return Messages;
  }
}
