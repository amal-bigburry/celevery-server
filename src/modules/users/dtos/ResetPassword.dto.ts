/**
 * ******************************************************************************************************
 * RegisterDto.ts
 * 
 * Data Transfer Object (DTO) crafted by Bigburry Hypersystems LLP for user registration requests. This class
 * enforces validation on essential user attributes to maintain data integrity during registration.
 * ******************************************************************************************************
 */

import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * ******************************************************************************************************
 * RegisterDto Class
 * 
 * Represents the data structure required to register a new user. It validates that the email is a valid and 
 * non-empty email string. Password, display name, and FCM token fields are required and must be non-empty strings.
 * The contact_number field is present but does not have validation decorators applied.
 * ******************************************************************************************************
 */
export class ResetPasswordDto {

  @IsString()
  @IsNotEmpty()
  email:string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  UUID:string;
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  OTP:string;
}
