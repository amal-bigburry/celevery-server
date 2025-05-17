/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { ISellerRepository } from '../interfaces/ISellerRepository.interface';
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';
import { Notify } from '../interfaces/Notify.interface';
import { NOTIFY } from '../../tokens/Notity.token';
/**
 * injectable service file that get all the placed orders
 */
@Injectable()
export class AddMessageToSellerSupportUsecase {
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
    @Inject(NOTIFY)
    private readonly Notify: Notify,
  ) {}
  /**
   * The executable file
   */
  async execute(MesssageSendDto:MesssageSendDto): Promise<Array<object>> {
    let Messages = await this.SellerRepository.AddMessage(MesssageSendDto);
    /**
     * Send notification to this support subscribers about the change
     */
    await this.Notify.buyer(MesssageSendDto.support_id)
    return Messages;
  }
}
