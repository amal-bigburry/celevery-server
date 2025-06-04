/**
 * ******************************************************************************************************
 * TokenDto.ts
 *
 * This Data Transfer Object (DTO) is defined by Bigburry Hypersystems LLP to handle FCM token data validation.
 * It ensures that the token sent for updates or registration is a non-empty string, which is essential for
 * maintaining valid communication tokens within the system.
 * ******************************************************************************************************
 */
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * ******************************************************************************************************
 * TokenDto Class
 *
 * Represents the structure for FCM token payload with validation decorators enforcing that fcm_token is a
 * required non-empty string to guarantee data correctness before processing.
 * ******************************************************************************************************
 */
export class TokenDto {
  @IsString()
  @IsNotEmpty()
  fcm_token: string;
}
