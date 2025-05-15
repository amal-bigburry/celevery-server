/**
 * importing the requeted packages
 */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 * register the dto
 */
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  contact_number: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  display_name: string;
  @IsString()
  @IsNotEmpty()
  fcm_token: string;
}
