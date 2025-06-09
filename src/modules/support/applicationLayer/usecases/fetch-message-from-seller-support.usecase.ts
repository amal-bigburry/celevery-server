/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the essential decorators from NestJS.
 * The @Inject decorator is used for injecting dependencies using specific tokens.
 * The @Injectable decorator marks this class as a provider within the NestJS dependency injection framework,
 * facilitating modularity and easy management of service instances.
 */
import { Inject, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing tokens that uniquely identify buyer and seller repository implementations.
 * These tokens enable decoupled and flexible dependency injection by abstracting the actual implementation details.
 */
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the interface defining the contract for seller repository methods.
 * This interface ensures any implementation provides the required data access methods related to seller operations,
 * enabling consistent interaction with seller-related data stores.
 */
import { ISellerRepository } from '../interfaces/iseller-repository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class is designated as injectable to allow NestJS to manage its lifecycle and dependencies.
 * It encapsulates the business logic needed to fetch all messages from a specific seller support thread.
 * This functionality supports retrieval of conversations or communication history linked to seller support tickets.
 */
@Injectable()
export class FetchMessageFromSellerSupportUsecase {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The constructor receives the seller repository dependency injected using the CREATE_SELLER_TOKEN.
 * This repository adheres to the ISellerRepository interface, allowing this use case to interact with seller data operations
 * without depending on concrete implementation details.
 */
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The execute method is the primary business operation of this class.
 * It takes a support_id string identifying a seller support thread and uses the repository to fetch associated messages.
 * It returns a promise that resolves to an array of message objects, representing the conversation history for the given support ID.
 */
  async execute(support_id: string): Promise<Array<object>> {
    let Messages = await this.SellerRepository.fetchMessages(support_id);
    return Messages;
  }
}
