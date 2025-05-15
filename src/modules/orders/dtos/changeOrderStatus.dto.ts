import { IsNotEmpty, IsString } from 'class-validator';
/**
 * change order status 
 */
export class ChangeOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;
  user_id:string;
  new_status: string;
}
