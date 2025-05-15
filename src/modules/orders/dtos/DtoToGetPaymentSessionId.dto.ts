import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
/** dto for creating the order*/
export class DtoToGetPaymentSessionId {
  @IsMongoId()
  order_id:string
  payment_tracking_id:string
  user_id: string;
  cake_id:string;
  variant_id:string;
}
