/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { OrderDetailDto } from "src/common/dtos/orderDetail.dto";
import { StoreDto } from "src/common/dtos/store.dto";

/**
 * Interface for the use case of getting store details by its ID
 */
export interface IGetOrderDetails {
  
  /**
   * Executes the retrieval of store details by store ID
   * @param store_id - The unique identifier for the store
   * @returns Promise of StoreDto containing the store details
   */
  execute(order_id: string): Promise<OrderDetailDto>;
}
