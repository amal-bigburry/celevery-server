// email.service.ts
import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {

  constructor(
  private sesClient: SESClient,
  private  configService: ConfigService,) {
    
    this.sesClient =  new SESClient({
            region: this.configService.get<string>('AWS_REGION'), // ap-south-1
            credentials: {
              accessKeyId: `${this.configService.get<string>('AWS_ACCESS_KEY')}`, // e.g., 'AKIAIOSFODNN7EXAMPLE'
              secretAccessKey: `${this.configService.get<string>('AWS_SECRET_KEY')}`, // e.g., 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
            },
          });
  }

  async sendOtp(toEmail: string, otp: string): Promise<void> {
    const params = {
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {

        Body: {
          Text: {
            Data: `Your OTP is: ${otp}`,
          },
        },
        Subject: {
          Data: 'Your OTP Code',
        },
      },
      Source: this.configService.get<string>('SES_VERIFIED_SENDER'), // Must be a verified sender
    };
    const command = new SendEmailCommand(params);
    await this.sesClient.send(command);
  }
}
