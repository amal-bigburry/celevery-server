/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing essential decorators from the NestJS framework.
 * @Inject decorator is used to inject dependencies by their unique tokens.
 * @Injectable marks this class as a provider that can be injected wherever required within the NestJS DI system.
 * These decorators enable modular and testable application structure.
 */
import { Inject, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the interface defining the contract for buyer repository operations.
 * This interface enforces that any implementing class provides necessary methods related to buyer data management,
 * fostering abstraction and consistent API across different implementations.
 */
import { IBuyerRepository } from '../interfaces/IBuyerRepository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the dependency injection token that resolves the buyer repository implementation.
 * The token ensures loose coupling by decoupling the use case class from the concrete repository implementation,
 * thus improving maintainability and flexibility.
 */
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class is declared injectable, making it accessible via NestJS's dependency injection.
 * It encapsulates the business logic required to fetch all support IDs associated with a specific buyer.
 * This functionality typically supports user interfaces or backend processes that need to list buyer support tickets or threads.
 */
@Injectable()
export class FetchAllSupportIdsForBuyerUseCase {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The constructor injects the buyer repository dependency using the CREATE_BUYER_TOKEN.
 * The repository interface allows this use case to interact with the data layer without knowledge of its concrete implementation.
 */
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerRepository: IBuyerRepository,
  ) {}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This asynchronous method is the primary execution point for fetching buyer support IDs.
 * It accepts a userId string and invokes the repository's fetchSupportIds method to retrieve all associated support identifiers.
 * It returns a promise resolving to an array of support ID strings, which can be used for further processing or display.
 */
  async execute(userId: string): Promise<Array<string>> {
    let support_id = await this.BuyerRepository.fetchSupportIds(userId);
    return support_id;
  }
}
