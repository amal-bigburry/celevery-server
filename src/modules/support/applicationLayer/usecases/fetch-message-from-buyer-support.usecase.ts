/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing necessary decorators from the NestJS framework.
 * @Inject allows for dependency injection using tokens to identify providers.
 * @Injectable designates this class as a service provider managed by the NestJS dependency injection system.
 * This enables modular design and facilitates testing by allowing easy substitution of dependencies.
 */
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerRepository } from '../interfaces/ibuyer-repository.interface';
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
@Injectable()
export class FetchMessageFromBuyerSupportUsecase {
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerRepository: IBuyerRepository,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * This asynchronous execute method serves as the primary function of this use case.
   * It accepts a support_id string that uniquely identifies the buyer support thread.
   * It calls the repository method to fetch all messages linked to that support ID,
   * returning a promise that resolves to an array of message objects.
   */
  async execute(support_id: string): Promise<Array<object>> {
    let Messages = await this.BuyerRepository.fetchMessages(support_id);
    return Messages;
  }
}
