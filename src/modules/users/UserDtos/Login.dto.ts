/**
 * importing the requiered packages
 */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 * dto for login
 */
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
