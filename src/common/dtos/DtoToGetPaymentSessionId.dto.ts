/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
export class DtoToGetPaymentSessionId {
  @IsMongoId() @IsNotEmpty() _id: string;
  payment_tracking_id: string;
  user_id: string;
  cake_id: string;
  variant_id: string;
}
