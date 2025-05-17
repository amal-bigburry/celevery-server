/**
 * importing all the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';
import { ISellerRepository } from '../interfaces/ISellerRepository.interface';
/**
 * injectable service file that get all the placed orders
 */
@Injectable()
export class FetchAllSupportIdsForSellerUseCase {
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}
  /**
   * The executable file
   */
  async execute(userId: string): Promise<Array<string>> {
    let support_id = await this.SellerRepository.fetchSupportIds(userId);
    return support_id;
  }
}
