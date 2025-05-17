/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
import { ISellerRepository } from '../interfaces/ISellerRepository.interface';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';
/**
 * injectable service file that get all the placed orders
 */
@Injectable()
export class FetchMessageFromSellerSupportUsecase {
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}
  /**
   * The executable file
   */
  async execute(support_id: string): Promise<Array<object>> {
    let Messages = await this.SellerRepository.fetchMessages(support_id);
    return Messages;
  }
}
