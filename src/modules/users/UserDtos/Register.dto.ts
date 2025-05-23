/**
 * ******************************************************************************************************
 * RegisterDto.ts
 * 
 * Data Transfer Object (DTO) crafted by Bigburry Hypersystems LLP for user registration requests. This class
 * enforces validation on essential user attributes to maintain data integrity during registration.
 * ******************************************************************************************************
 */

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * ******************************************************************************************************
 * RegisterDto Class
 * 
 * Represents the data structure required to register a new user. It validates that the email is a valid and 
 * non-empty email string. Password, display name, and FCM token fields are required and must be non-empty strings.
 * The contact_number field is present but does not have validation decorators applied.
 * ******************************************************************************************************
 */
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  contact_number: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  display_name: string;

  profile_url:string;
  favourites:Array<string>;
  contact_number_isVerified:Boolean;

  @IsString()
  @IsNotEmpty()
  fcm_token: string;
}
