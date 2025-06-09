/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing necessary decorators from the NestJS framework.
 * @Inject allows for dependency injection using tokens to identify providers.
 * @Injectable designates this class as a service provider managed by the NestJS dependency injection system.
 * This enables modular design and facilitates testing by allowing easy substitution of dependencies.
 */
import { Inject, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the interface which defines the contract for buyer repository methods.
 * This interface enforces implementation of required functions related to buyer data operations,
 * promoting loose coupling and abstraction from the actual data source.
 */
import { IBuyerRepository } from '../interfaces/ibuyer-repository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the injection token used to identify the buyer repository implementation.
 * Using tokens allows decoupling the service logic from specific repository implementations,
 * increasing flexibility and ease of maintenance.
 */
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class is marked as injectable to allow its instances to be created and managed by NestJS's DI container.
 * It contains the business logic to fetch all support messages associated with a particular buyer support ID.
 * This enables retrieval of conversation history or support messages for buyer support threads.
 */
@Injectable()
export class FetchMessageFromBuyerSupportUsecase {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Constructor uses dependency injection to obtain an implementation of the buyer repository.
 * The injected repository must conform to IBuyerRepository interface and is identified by the CREATE_BUYER_TOKEN.
 */
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
