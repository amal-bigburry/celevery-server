/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

import { PopDto } from "src/modules/mqtt/dtos/pop.dto";

/**
 * Interface for the MQTT service
 */
export interface IMqttService {
  
  /**
   * Executes the publishing of a message
   * @param data - The data to be published
   * @returns Promise indicating the status of the publish action
   */
  publish(data:PopDto): Promise<string>;
}
