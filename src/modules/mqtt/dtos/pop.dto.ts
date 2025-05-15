/**
 * importing the required packages
 */
import { IsNotEmpty, IsString } from 'class-validator';
/**
 * dto to handle the pop up message
 */
export class PopDto {
  @IsNotEmpty()
  @IsString()
  message: string;
  @IsNotEmpty()
  @IsString()
  topic: string;
}
