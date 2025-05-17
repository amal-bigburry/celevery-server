/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
export class DtoToGetPaymentSessionId {
  @IsMongoId() @IsNotEmpty() order_id: string;
  @IsNotEmpty() @IsString() payment_tracking_id: string;
  @IsNotEmpty() @IsString() user_id: string;
  @IsNotEmpty() @IsString() cake_id: string;
  @IsNotEmpty() @IsString() variant_id: string;
}
