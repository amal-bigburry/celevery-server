/**
 * importing required packages
 */
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
/**
 * Injectable service for twilioservice
 */
@Injectable()
export class TwilioService {
  private client: Twilio;
  private from: string;
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    this.from = process.env.TWILIO_SERVICE_ID!;
    this.client = new Twilio(accountSid, authToken);
  }
  /**
   * send opt function
   */
  async sendOtp(to: string, otp: string): Promise<any> {
    return this.client.messages.create({
      body: `Your OTP is: ${otp}`,
      messagingServiceSid: this.from,
      to,
    });
  }
}
