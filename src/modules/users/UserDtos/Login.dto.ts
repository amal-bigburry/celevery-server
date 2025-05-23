/**
 * ******************************************************************************************************
 * LoginDto.ts
 * 
 * Data Transfer Object (DTO) defined by Bigburry Hypersystems LLP to validate and transport login data within 
 * the system. It uses class-validator decorators to enforce that the email field contains a valid non-empty 
 * email format, and the password field is a non-empty string, ensuring basic input validation before processing.
 * ******************************************************************************************************
 */

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * ******************************************************************************************************
 * LoginDto Class
 * 
 * Defines the shape and validation rules for the login request payload, with email and password fields. 
 * The email must be a valid email format and cannot be empty; password must be a non-empty string.
 * ******************************************************************************************************
 */
export class LoginDto {
  @IsNotEmpty()
  emailOrNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
