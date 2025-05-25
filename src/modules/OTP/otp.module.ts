/**
 * Importing the required packages necessary for the Twilio module.
 * The `@nestjs/common` package is used to define the module and various decorators such as `Module`.
 * The `@nestjs/config` package is used to integrate configuration management, allowing the app to load and access environment variables.
 * The `TwilioService` is imported from the use case layer, which handles the functionality for sending OTPs.
 * The `OtpController` is imported from the controller layer, which processes incoming HTTP requests related to OTP operations.
 *
 * Company: BigBurry Hypersystems LLP
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OtpController } from './infrastructureLayer/controllers/otp.controller';
import { SESClient } from '@aws-sdk/client-ses';
import { OTPSendingService } from './applicationLayer/usecases/Send.usecase';
import { OTPVerifyingService } from './applicationLayer/usecases/Verify.usecase';
import { REGISTER_OTP_TOKEN } from './tokens/ResiterOTP.token';
import { OTPStorageRepositoryImp } from './infrastructureLayer/implimentations/otpstorage.repository.imp';
import { MongooseModule } from '@nestjs/mongoose';
import { OTPStorageSchema } from './infrastructureLayer/models/otpStorage.schema';
// import { EmailService } from './infrastructureLayer/usecases/emailService.usecase';
/**
 * Module definition for the Twilio functionality within the application.
 * This module is responsible for handling all OTP-related services and HTTP requests.
 * It imports the `ConfigModule` to handle configuration settings, such as retrieving API keys from environment variables.
 * The `TwilioService` is included as a provider, allowing it to be injected into other parts of the application to send OTPs via SMS.
 * The `OtpController` is included as a controller, which exposes HTTP endpoints to interact with OTP functionalities.
 *
 * The module encapsulates all Twilio-related functionality, including sending OTPs and configuring environment-dependent settings.
 * This modular approach ensures that the Twilio integration is contained within a specific module, maintaining separation of concerns.
 *
 * The module is also exporting the `TwilioService`, making it available to other modules that might require the ability to send OTPs.
 *
 * Company: BigBurry Hypersystems LLP
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OTPStorage', schema: OTPStorageSchema },
    ]),
    ConfigModule,
  ], // Importing the ConfigModule to manage configuration and environment variables
  providers: [
    SESClient,
    OTPSendingService,
    OTPVerifyingService,
    {
      provide: REGISTER_OTP_TOKEN,
      useClass: OTPStorageRepositoryImp,
    },
  ], // Registering TwilioService as a provider to handle OTP-related services
  controllers: [OtpController], // Registering OtpController to handle HTTP requests related to OTP functionalities
  exports: [OTPSendingService, OTPVerifyingService], // Exporting TwilioService for use in other modules
})
export class OTPModule {}
