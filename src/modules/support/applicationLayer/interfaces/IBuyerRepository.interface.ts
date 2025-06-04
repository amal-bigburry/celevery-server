/**
 * Bigburry Hypersystems LLP - Buyer Repository Interface
 * 
 * This interface defines the structure of the repository layer that handles 
 * buyer-specific functionalities for the support message system. Implementing 
 * classes are expected to interact with a database or persistence layer to 
 * fulfill these operations. The methods defined here are integral to supporting 
 * communication workflows for authenticated buyers.
 */

import { MesssageSendDto } from "../../../../common/dtos/MesssageSend.dto";

/**
 * IBuyerRepository Interface
 * 
 * Serves as a contract for repository implementations that manage support-related 
 * operations such as message creation, message retrieval, and tracking support 
 * conversation identifiers. It ensures consistency across implementations 
 * that support messaging between buyers and support representatives.
 */
export interface IBuyerRepository {

  /**
   * Creates a new buyer support session or registration tied to the given user ID.
   * @param userId A unique identifier representing the user initiating support.
   * @returns A Promise that resolves to a string, which may represent a confirmation ID or session ID.
   */
  create(userId: string): Promise<string>;

  /**
   * Fetches all message objects tied to a specific support session.
   * @param support_id A unique identifier representing the support conversation or thread.
   * @returns A Promise resolving to an array of objects where each object represents a support message.
   */
  fetchMessages(support_id: string): Promise<Array<object>>;

  /**
   * Adds a new message to the support system using the provided DTO.
   * @param MesssageSendDto A structured data transfer object that contains the message details to be persisted.
   * @returns A Promise resolving to an array of objects representing the updated list of messages after insertion.
   */
  AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>>;

  /**
   * Retrieves a list of support session identifiers associated with a particular user.
   * @param user_id A string representing the user whose support session IDs are being queried.
   * @returns A Promise resolving to an array of strings, each string being a unique support session ID.
   */
  fetchSupportIds(user_id: string): Promise<Array<string>>;
}
