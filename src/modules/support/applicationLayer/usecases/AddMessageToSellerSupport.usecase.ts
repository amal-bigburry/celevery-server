/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing necessary decorators from NestJS core.
 * @Inject allows injection of specific dependencies identified by tokens.
 * @Injectable registers this class as a provider in the NestJS dependency injection container,
 * making it accessible and manageable throughout the application.
 */
import { Inject, Injectable } from '@nestjs/common';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the interface that defines the structure for seller repository operations.
 * The ISellerRepository interface ensures that any implementation adheres to the defined contract,
 * which enhances code maintainability, testability, and abstraction between layers.
 */
import { ISellerRepository } from '../interfaces/ISellerRepository.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the DTO used to carry structured message data from one layer to another.
 * This DTO standardizes the input expected when adding a support message,
 * reducing the likelihood of malformed data being processed by the system.
 */
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing a specific token used for dependency injection of the seller repository implementation.
 * Tokens allow decoupling the dependency resolution from specific class names,
 * which facilitates modular architecture and runtime flexibility in resolving service dependencies.
 */
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the interface that defines the notification mechanism.
 * This interface abstracts the notification logic,
 * allowing various implementations such as push notifications, emails, or message brokers without modifying the business logic.
 */
import { Notify } from '../interfaces/Notify.interface';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * Importing the DI token used for resolving the Notify interface implementation.
 * This token is linked to a notification service configured at the module level,
 * which allows notifications to be sent when key operations are performed.
 */
import { NOTIFY } from '../../tokens/Notity.token';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class is marked as injectable, making it available for dependency injection across the NestJS ecosystem.
 * It encapsulates the business logic required to add a support message specifically for sellers.
 * Additionally, it integrates a notification mechanism to inform subscribers of support thread updates.
 */
@Injectable()
export class AddMessageToSellerSupportUsecase {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * The constructor initializes two injected dependencies.
 * One is the SellerRepository for handling data operations related to seller support messages.
 * The other is the Notify service used to dispatch updates to listeners or stakeholders subscribed to changes in the support flow.
 */
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
    @Inject(NOTIFY)
    private readonly Notify: Notify,
  ) {}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This method is the primary executable entry point of the use case.
 * It takes a message DTO as input, which contains all required data to add a new message to a seller's support thread.
 * The method interacts with the repository to persist the new message and then sends a notification about the update.
 * The result is an array of message objects, likely reflecting the current state of the message thread.
 */
  async execute(MesssageSendDto:MesssageSendDto): Promise<Array<object>> {
    let Messages = await this.SellerRepository.AddMessage(MesssageSendDto);

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * After successfully adding the message to the seller support log,
 * this line triggers a notification to all relevant subscribers or systems.
 * It utilizes the Notify service and passes the support identifier,
 * ensuring that observers are made aware of the new addition in real time or near real time.
 */
    await this.Notify.buyer(MesssageSendDto.support_id)
    return Messages;
  }
}
