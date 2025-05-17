/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerRepository } from '../interfaces/IBuyerRepository.interface';
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
/**
 * injectable service file that get all the placed orders
 */
@Injectable()
export class FetchMessageFromBuyerSupportUsecase {
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerRepository: IBuyerRepository,
  ) {}
  /**
   * The executable file
   */
  async execute(support_id: string): Promise<Array<object>> {
    let Messages = await this.BuyerRepository.fetchMessages(support_id);
    return Messages;
  }
}
