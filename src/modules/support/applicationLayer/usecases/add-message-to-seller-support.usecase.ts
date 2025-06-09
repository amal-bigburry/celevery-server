/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing necessary decorators from NestJS core.
 * @Inject allows injection of specific dependencies identified by tokens.
 * @Injectable registers this class as a provider in the NestJS dependency injection container,
 * making it accessible and manageable throughout the application.
 */
import { Inject, Injectable } from '@nestjs/common';
import { ISellerRepository } from '../interfaces/iseller-repository.interface';
import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';
import { Notify } from '../interfaces/notify.interface';
import { NOTIFY } from '../../tokens/Notity.token';
@Injectable()
export class AddMessageToSellerSupportUsecase {
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
    @Inject(NOTIFY)
    private readonly Notify: Notify,
  ) {}

  /**
   * Company: Bigburry Hypersystems LLP
   *
   * This method is the primary executable entry point of the use case.
   * It takes a message DTO as input, which contains all required data to add a new message to a seller's support thread.
   * The method interacts with the repository to persist the new message and then sends a notification about the update.
   * The result is an array of message objects, likely reflecting the current state of the message thread.
   */
  async execute(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let Messages = await this.SellerRepository.AddMessage(MesssageSendDto);

    /**
     * Company: Bigburry Hypersystems LLP
     *
     * After successfully adding the message to the seller support log,
     * this line triggers a notification to all relevant subscribers or systems.
     * It utilizes the Notify service and passes the support identifier,
     * ensuring that observers are made aware of the new addition in real time or near real time.
     */
    await this.Notify.buyer(MesssageSendDto.support_id);
    return Messages;
  }
}
