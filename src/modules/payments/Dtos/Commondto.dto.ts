import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
/**
 * change order status
 */
export class CommonDto {
  /**
   * order id of the order that need to be refunded
   */
  @IsMongoId()
  mongodbid: string;
}
