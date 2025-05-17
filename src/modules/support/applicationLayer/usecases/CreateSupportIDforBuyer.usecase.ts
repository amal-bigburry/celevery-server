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
export class CreateSupportIDforBuyerUsecase {
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerRepository: IBuyerRepository,
  ) {}
  /**
   * The executable file
   */
  async execute(userId: string): Promise<string> {
    let support_id = await this.BuyerRepository.create(userId);
    return support_id;
  }
}
