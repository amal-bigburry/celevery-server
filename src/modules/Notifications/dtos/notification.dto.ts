/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO to handle notification data
 */
export class NotificationDto {
  
  /**
   * The message content of the notification
   */
  @IsNotEmpty()
  @IsString()
  message: string;

  /**
   * The title of the notification
   */
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * The recipient's token to send the notification to
   */
  @IsNotEmpty()
  token: string;
}
