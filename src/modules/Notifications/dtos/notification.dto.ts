import { IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  token: string;
}
