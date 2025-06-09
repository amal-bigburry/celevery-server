/**
 * Bigburry Hypersystems LLP - Seller Repository Interface
 *
 * This interface defines the contract for all operations related to seller support interactions.
 * It ensures that any implementing class adheres to a standard structure for managing
 * support sessions and message communications between sellers and support personnel.
 * The methods are structured to enable consistent and reliable access to support-related data
 * through various lifecycle stages of a support interaction.
 */

import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';

/**
 * ISellerRepository Interface
 *
 * A formal declaration of support-handling behaviors specifically for sellers on the platform.
 * This interface standardizes methods for initiating support sessions, sending and retrieving
 * messages, and listing conversation identifiers. Implementers are responsible for ensuring
 * integration with persistence mechanisms such as databases or APIs.
 */
export interface ISellerRepository {
  // create or add
  create(userId: string): Promise<string>;
  AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>>;
  // get or fetch
  fetchMessages(support_id: string): Promise<Array<object>>;
  fetchSupportIds(user_id: string): Promise<Array<string>>;
}
