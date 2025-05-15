/**
 * importing required packages
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwilioService } from './infrastructureLayer/usecases/twilio.otp.usecase';
import { OtpController } from './infrastructureLayer/controllers/otp.controller';
/**
 * modules
 */
@Module({
  imports: [ConfigModule],
  providers: [TwilioService],
  controllers: [OtpController],
  exports: [TwilioService],
})
export class TwilioModule {}
