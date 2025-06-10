/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing essential decorators from the NestJS framework.
 * @Inject decorator is used to inject dependencies by their unique tokens.
 * @Injectable marks this class as a provider that can be injected wherever required within the NestJS DI system.
 * These decorators enable modular and testable application structure.
 */
import { Inject, Injectable } from '@nestjs/common';
import { BuyerInterface } from '../interfaces/ibuyer-repository.interface';
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
@Injectable()
export class FetchAllSupportIdsForBuyerUseCase {
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerInterface: BuyerInterface,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * This asynchronous method is the primary execution point for fetching buyer support IDs.
   * It accepts a userId string and invokes the repository's fetchSupportIds method to retrieve all associated support identifiers.
   * It returns a promise resolving to an array of support ID strings, which can be used for further processing or display.
   */
  async execute(userId: string): Promise<Array<string>> {
    let support_id = await this.BuyerInterface.fetchSupportIds(userId);
    return support_id;
  }
}
