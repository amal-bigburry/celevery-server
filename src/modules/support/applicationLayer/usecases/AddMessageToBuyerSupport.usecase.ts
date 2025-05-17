/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the core NestJS dependency injection utilities.
 * @Inject is used for injecting specific implementations or constants.
 * @Injectable marks the class as a provider that can be injected into other classes via NestJS’s dependency injection system.
 * These are critical for constructing loosely-coupled and testable services in the NestJS framework.
 */
import { Inject, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This import brings in the interface that defines the contract for buyer-related repository functions.
 * It is used to ensure that any class implementing IBuyerRepository will adhere to the defined method signatures,
 * thereby promoting consistency and abstraction across the application layers.
 */
import { IBuyerRepository } from '../interfaces/IBuyerRepository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This line imports a specific dependency injection token named CREATE_BUYER_TOKEN.
 * It is likely linked to a provider defined in the application's module configuration,
 * and is used here to identify the correct implementation of the repository during injection.
 */
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This import brings in the interface for seller-related repository operations.
 * It provides a structural blueprint for all seller repository implementations.
 * Even though this file is named for buyer use cases, it appears to depend on seller repository methods.
 */
import { ISellerRepository } from '../interfaces/ISellerRepository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This line imports the data transfer object used when sending messages.
 * DTOs enforce strict typing and structure, ensuring that only expected fields and types are passed into business logic.
 * This enhances code robustness and minimizes unexpected runtime behaviors.
 */
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This annotation marks the class as injectable, allowing it to participate in NestJS’s dependency injection system.
 * It is a standard decorator used to register service classes as providers in the NestJS application architecture.
 * This service is responsible for adding new support messages to the buyer support communication system.
 */
@Injectable()
export class AddMessageToBuyerSupportUsecase {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The constructor method is used to inject dependencies required by this use case class.
 * It injects a repository that follows the ISellerRepository interface, identified by the CREATE_BUYER_TOKEN.
 * Despite the naming, the injected repository seems to handle seller-related logic, which may indicate shared behavior or a naming inconsistency.
 */
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This asynchronous method serves as the entry point for executing the business logic of adding a message.
 * It takes a DTO object that encapsulates all required message details and forwards it to the repository layer for persistence.
 * It returns a promise that resolves to an array of message objects, which could be the updated message history or confirmation of the action.
 */
  async execute(MesssageSendDto: MesssageSendDto): Promise<Array<object>> {
    let Messages = await this.SellerRepository.AddMessage(MesssageSendDto);
    return Messages;
  }
}
