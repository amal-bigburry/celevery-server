/**
 * Bigburry Hypersystems LLP - Seller Repository Interface
 * 
 * This interface defines the contract for all operations related to seller support interactions. 
 * It ensures that any implementing class adheres to a standard structure for managing 
 * support sessions and message communications between sellers and support personnel. 
 * The methods are structured to enable consistent and reliable access to support-related data 
 * through various lifecycle stages of a support interaction.
 */

import { MesssageSendDto } from "../../../../common/dtos/MesssageSend.dto";

/**
 * ISellerRepository Interface
 * 
 * A formal declaration of support-handling behaviors specifically for sellers on the platform. 
 * This interface standardizes methods for initiating support sessions, sending and retrieving 
 * messages, and listing conversation identifiers. Implementers are responsible for ensuring 
 * integration with persistence mechanisms such as databases or APIs.
 */
export interface ISellerRepository {

  /**
   * Creates a new support session or log entry for a seller based on the provided user ID.
   * @param userId A unique string identifier representing the seller initiating support.
   * @returns A Promise that resolves to a string, typically representing a newly created session or record ID.
   */
  create(userId: string): Promise<string>;

  /**
   * Retrieves the complete list of messages exchanged in a particular seller support session.
   * @param support_id A string identifier that maps to a specific support thread or conversation.
   * @returns A Promise that resolves to an array of message objects associated with the specified support session.
   */
  fetchMessages(support_id: string): Promise<Array<object>>;

  /**
   * Adds a new message to an existing seller support session using a well-defined message data structure.
   * @param MesssageSendDto An instance of the data transfer object that encapsulates all message attributes.
   * @returns A Promise that resolves to the updated list of message objects following the new addition.
   */
  AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>>;

  /**
   * Retrieves a list of all support session identifiers associated with a particular seller.
   * @param user_id A unique string representing the seller whose session IDs need to be fetched.
   * @returns A Promise that resolves to an array of string identifiers for the seller’s active or past support threads.
   */
  fetchSupportIds(user_id: string): Promise<Array<string>>;
}
