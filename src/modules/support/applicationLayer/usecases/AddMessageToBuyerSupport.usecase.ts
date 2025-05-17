/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerRepository } from '../interfaces/IBuyerRepository.interface';
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
import { ISellerRepository } from '../interfaces/ISellerRepository.interface';
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';
/**
 * injectable service file that get all the placed orders
 */
@Injectable()
export class AddMessageToBuyerSupportUsecase {
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}
  /**
   * The executable file
   */
  async execute(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let Messages = await this.SellerRepository.AddMessage(MesssageSendDto);
    return Messages;
  }
}
