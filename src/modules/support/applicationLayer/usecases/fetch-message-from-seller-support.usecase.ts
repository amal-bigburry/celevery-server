/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing the essential decorators from NestJS.
 * The @Inject decorator is used for injecting dependencies using specific tokens.
 * The @Injectable decorator marks this class as a provider within the NestJS dependency injection framework,
 * facilitating modularity and easy management of service instances.
 */
import { Inject, Injectable } from '@nestjs/common';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';
import { SellerInterface } from '../interfaces/iseller-repository.interface';
@Injectable()
export class FetchMessageFromSellerSupportUsecase {
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerInterface: SellerInterface,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * The execute method is the primary business operation of this class.
   * It takes a support_id string identifying a seller support thread and uses the repository to fetch associated messages.
   * It returns a promise that resolves to an array of message objects, representing the conversation history for the given support ID.
   */
  async execute(support_id: string): Promise<Array<object>> {
    let Messages = await this.SellerInterface.fetchMessages(support_id);
    return Messages;
  }
}
