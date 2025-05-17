import { MesssageSendDto } from "../../dtos/MesssageSend.dto";

export interface IBuyerRepository {
  create(userId:string): Promise<string>;
  fetchMessages(support_id:string): Promise<Array<object>>;
  AddMessage(MesssageSendDto:MesssageSendDto): Promise<Array<object>>;
  fetchSupportIds(user_id:string): Promise<Array<string>>;
  
}