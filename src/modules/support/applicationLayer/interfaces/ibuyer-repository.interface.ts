/**
 * Bigburry Hypersystems LLP - Buyer Repository Interface
 *
 * This interface defines the structure of the repository layer that handles
 * buyer-specific functionalities for the support message system. Implementing
 * classes are expected to interact with a database or persistence layer to
 * fulfill these operations. The methods defined here are integral to supporting
 * communication workflows for authenticated buyers.
 */
import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';
/**
 * IBuyerRepository Interface
 *
 * Serves as a contract for repository implementations that manage support-related
 * operations such as message creation, message retrieval, and tracking support
 * conversation identifiers. It ensures consistency across implementations
 * that support messaging between buyers and support representatives.
 */
export interface IBuyerRepository {
  // add or create
  AddMessage(MesssageSendDto: MesssageSendDto): Promise<Array<object>>;
  create(userId: string): Promise<string>;
  // get or fetch
  fetchMessages(support_id: string): Promise<Array<object>>;
  fetchSupportIds(user_id: string): Promise<Array<string>>;
}
