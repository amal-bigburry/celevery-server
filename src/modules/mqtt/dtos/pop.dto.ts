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
 * dto to handle the pop-up message
 */
export class PopDto {
  @IsNotEmpty()
  @IsString()
  message: string;
  
  @IsNotEmpty()
  @IsString()
  topic: string;
}
