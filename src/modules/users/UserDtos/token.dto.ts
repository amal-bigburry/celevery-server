/**
 * importing the required packages
 */
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * dto for token
 */
export class TokenDto {
  @IsString()
  @IsNotEmpty()
  fcm_token: string;
}
