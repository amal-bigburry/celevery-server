/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing essential decorators from the NestJS framework.
 * @Inject is used for injecting dependencies by their tokens.
 * @Injectable marks the class as a provider that can be managed by NestJS's dependency injection system.
 * This allows for modular, loosely coupled architecture and facilitates testing and maintainability.
 */
import { Inject, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the dependency injection token that identifies the seller repository implementation.
 * This token helps decouple the use case from specific repository implementations,
 * allowing easier swapping or mocking of implementations.
 */
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the interface defining the contract for seller repository methods.
 * The ISellerRepository interface ensures that the injected repository conforms to expected method signatures,
 * enabling type safety and consistent behavior throughout the application.
 */
import { ISellerRepository } from '../interfaces/ISellerRepository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class is declared injectable so that it can be provided via NestJS's DI system.
 * It contains the business logic responsible for creating a unique support identifier associated with a seller.
 * The support ID typically serves to track and manage seller support requests or tickets.
 */
@Injectable()
export class CreateSupportIDforSellerUsecase {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The constructor uses dependency injection to receive an instance of a seller repository.
 * The repository is identified by the CREATE_SELLER_TOKEN, ensuring the correct implementation is injected.
 */
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The execute method is the main entry point of this use case.
 * It accepts a userId as a string parameter, delegates the creation of a support ID to the repository,
 * and returns a promise resolving to the generated support ID string.
 * This allows the system to consistently generate and manage support identifiers for sellers.
 */
  async execute(userId: string): Promise<string> {
    let support_id = await this.SellerRepository.create(userId);
    return support_id;
  }
}
