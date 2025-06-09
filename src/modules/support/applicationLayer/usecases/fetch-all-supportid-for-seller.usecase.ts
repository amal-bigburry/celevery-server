/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing essential decorators from the NestJS framework.
 * @Inject decorator enables injection of dependencies by unique tokens.
 * @Injectable marks this class as a provider managed by the NestJS dependency injection system.
 * These are fundamental to building modular, testable, and maintainable services in NestJS.
 */
import { Inject, Injectable } from '@nestjs/common';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';
import { ISellerRepository } from '../interfaces/iseller-repository.interface';
@Injectable()
export class FetchAllSupportIdsForSellerUseCase {
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * This asynchronous method executes the main business logic.
   * It accepts a userId string, calls the repository’s fetchSupportIds method to retrieve all support IDs,
   * and returns a promise that resolves to an array of strings representing these support identifiers.
   */
  async execute(userId: string): Promise<Array<string>> {
    let support_id = await this.SellerRepository.fetchSupportIds(userId);
    return support_id;
  }
}
