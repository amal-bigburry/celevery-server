/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO to change the order status
 */
export class ChangeOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
  user_id: string;
  new_status: string;
  @IsString()
  @IsOptional()
  cancellation_reason?: string;
}
