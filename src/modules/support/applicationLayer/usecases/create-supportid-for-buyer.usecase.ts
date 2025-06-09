/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing essential decorators from NestJS.
 * @Inject is used for injecting dependencies identified by specific tokens.
 * @Injectable marks the class as a provider that can be injected into other parts of the application.
 * These utilities enable robust dependency injection, a core feature of the NestJS framework.
 */
import { Inject, Injectable } from '@nestjs/common';

/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing the interface that defines the contract for buyer repository operations.
 * This interface ensures any class implementing it adheres to a defined set of methods,
 * providing abstraction and consistency when interacting with buyer-related data stores.
 */
import { IBuyerRepository } from '../interfaces/ibuyer-repository.interface';

/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing the token used to inject the specific buyer repository implementation.
 * This token facilitates loose coupling by allowing the injection of a repository without hard-coding its implementation,
 * thereby supporting modularity and ease of testing.
 */
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';

/**
 * Company: Bigburry Hypersystems LLP
 *
 * This class is marked as injectable, meaning it can be managed by NestJS’s dependency injection container.
 * The class encapsulates the business logic for creating a unique support identifier for buyers,
 * which is typically used to track support sessions or requests.
 */
@Injectable()
export class CreateSupportIDforBuyerUsecase {
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * The constructor injects the BuyerRepository dependency using the CREATE_BUYER_TOKEN.
   * This repository is expected to implement buyer-related data operations, including creation of support IDs.
   */
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerRepository: IBuyerRepository,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * The execute method is the primary function of this use case.
   * It accepts a userId as input and delegates the creation of a support ID to the buyer repository.
   * The method returns a promise that resolves to the newly created support ID as a string,
   * enabling downstream processes to track buyer support activities effectively.
   */
  async execute(userId: string): Promise<string> {
    let support_id = await this.BuyerRepository.create(userId);
    return support_id;
  }
}
