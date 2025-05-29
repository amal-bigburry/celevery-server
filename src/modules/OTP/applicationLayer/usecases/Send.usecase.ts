/**
 * OTPSendingService
 *
 * This service handles sending OTPs (One-Time Passwords) via SMS using Twilio or via email using AWS SES.
 * It integrates with:
 * - Twilio: for SMS delivery
 * - AWS SES: for email delivery
 * - MongoDB (via OTPStorageRepository): to store the OTP with expiration
 *
 * Company: BigBurry Hypersystems LLP
 */

// ses-test.ts

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { REGISTER_OTP_TOKEN } from 'src/modules/OTP/tokens/ResiterOTP.token';
import { Twilio } from 'twilio';
import { OTPStorageRepository } from '../interfaces/otpStorage.repository';
// import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { OTP_TEMPLATES } from 'src/templates/email.template';

@Injectable()
export class OTPSendingService {
  private client: Twilio; // Twilio client instance for sending SMS
  private from: string; // Twilio Messaging Service SID (used as SMS sender)

  /**
   * Constructor initializes Twilio and AWS SES clients with credentials from environment variables.
   *
   * @param OTPStorageRepository Repository for storing OTPs
   * @param sesClient AWS SES client (will be reconfigured in constructor)
   * @param configService Service for accessing environment variables
   */
  constructor(
    @Inject(REGISTER_OTP_TOKEN)
    private readonly OTPStorageRepository: OTPStorageRepository,
    private configService: ConfigService,
  ) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    this.from = process.env.TWILIO_SERVICE_ID!;
    this.client = new Twilio(accountSid, authToken);
  }

  /**
   * Sends a 6-digit OTP to the user via SMS or Email based on the `method` provided.
   *
   * @param to Recipient's phone number or email address
   * @param UUID Unique identifier to associate the OTP with a user/session
   * @param method 'sms' to send via Twilio, 'email' to send via SES
   *
   * @returns A Promise that resolves when the message has been sent
   */
  async send(to: string, UUID: string, method: string): Promise<void> {
    let existing = await this.OTPStorageRepository.isUUIDExist(UUID);

    const OTP = (Math.floor(Math.random() * 900000) + 100000).toString();
    const WaitingTimeOptions = [1, 3, 5, 8, 10];
    // console.log(existing)
    // if (existing) {
    //   let UUIDDoc = await this.OTPStorageRepository.getOTPDocOf(UUID);
    //   if (UUIDDoc.attempts >= 5) {
    //     throw new BadRequestException(
    //       'You have Already finished your 5 attempts with this UUID',
    //     );
    //   }
    //   let waitingTimeInMilliSeconds =
    //     WaitingTimeOptions[UUIDDoc.attempts] * 60000;
    //   let LastRequestTimeInMillisecond = new Date(
    //     UUIDDoc.last_request_time.toString(),
    //   ).getTime();

    //   let NextAttemptAt =
    //     waitingTimeInMilliSeconds + LastRequestTimeInMillisecond;
    //   // console.log(new Date(NextAttemptAt).toLocaleString());
    //   if (NextAttemptAt > Date.now()) {
    //     throw new BadRequestException(
    //       `please wait ${Math.floor((NextAttemptAt - Date.now()) / 1000)} s for the next try`,
    //     );
    //   } else {
    //     await this.OTPStorageRepository.increaseAttempt(UUID, UUIDDoc.attempts);
    //     await this.OTPStorageRepository.updateLastRequestTime(UUID, new Date());
    //   }
    // } else {
      // Store the generated OTP in the repository with the UUID
      await this.OTPStorageRepository.create(UUID, OTP);
    // }

    if (method === 'sms') {
      // Send OTP via Twilio SMS
      await this.client.messages.create({
        body: `Your OTP is: ${OTP}`,
        messagingServiceSid: this.from,
        to,
      });
    } else if (method === 'email') {
      // Send OTP via AWS SES
      // Set the region
      AWS.config.update({
        region: this.configService.get<string>('AWS_REGION'),
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY')!,
      });

      // Create sendEmail params
      var params = {
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: OTP_TEMPLATES('t2', OTP),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Celevery Verification',
          },
        },
        Source: this.configService.get<string>('SES_VERIFIED_SENDER'),
        ReplyToAddresses: [
          this.configService.get<string>('SES_VERIFIED_SENDER'),
          /* more items */
        ],
      };

      // Create the promise and SES service object
      var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
        .sendEmail(params)
        .promise();

      // Handle promise's fulfilled/rejected states
      sendPromise
        .then(function (data) {
          // console.log(data.MessageId);
        })
        .catch(function (err) {
          console.error(err, err.stack);
        });
    } else {
      throw new BadGatewayException(
        'method not found, Allowed methods sms, email',
      );
    }

    return;
  }
}
