/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing essential decorators from the NestJS framework.
 * @Inject decorator enables injection of dependencies by unique tokens.
 * @Injectable marks this class as a provider managed by the NestJS dependency injection system.
 * These are fundamental to building modular, testable, and maintainable services in NestJS.
 */
import { Inject, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the token used for injecting the seller repository implementation.
 * The token ensures decoupling of this use case from specific implementations,
 * allowing for easier testing and substitution without modifying this code.
 */
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the interface defining the seller repository contract.
 * This interface abstracts the methods required for seller-related data operations,
 * providing a consistent API regardless of underlying implementation details.
 */
import { ISellerRepository } from '../interfaces/iseller-repository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class is decorated as injectable, allowing it to be injected and managed by NestJS’s DI container.
 * It encapsulates the business logic to fetch all support IDs linked to a seller, typically used to list seller support cases.
 */
@Injectable()
export class FetchAllSupportIdsForSellerUseCase {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The constructor injects the seller repository implementation identified by CREATE_SELLER_TOKEN.
 * This repository interface allows interaction with the data layer without direct dependency on its implementation.
 */
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
