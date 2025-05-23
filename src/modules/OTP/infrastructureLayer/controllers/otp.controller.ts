/**
 * Import the required packages
 */
import { Body, Controller, Post } from '@nestjs/common';
import { TwilioService } from '../usecases/twilio.otp.usecase';
import { EmailService } from '../usecases/emailService.usecase';

/**
 * OTP Controller handles routes related to OTP (One-Time Password) functionality.
 * This controller interacts with the TwilioService to send OTPs to users.
 */
@Controller('otp') // Route for OTP-related actions
export class OtpController {
  constructor(
    private readonly twilioService: TwilioService,
    private readonly emailService: EmailService,
  ) {} // Inject TwilioService

  /**
   * Route: /otp/send
   * 
   * This endpoint sends an OTP to a specified phone number.
   * @param data - Contains the 'to' phone number where OTP needs to be sent.
   * @returns A confirmation message once OTP is sent.
   */
  @Post('sms/send') // POST request to send OTP
  async sendOtp(@Body() data: { to: string }) {
    // Call the TwilioService to send OTP
    await this.twilioService.sendOtp(
      data.to, // The phone number to send OTP to
      'This is a test OTP from Cake Factory 2323. Use it only inside the Application. Thank you! Have a nice day. Goodbye.', // OTP message
    );
    return 'OTP sent successfully'; // Return a confirmation response
  }

  @Post('email/send') // POST request to send OTP
  async sendOtpusingemail(@Body() data: { to: string }) {
    // Call the TwilioService to send OTP
    await this.emailService.sendOtp(data.to, 'this is the otp to reset 23455');
    return 'OTP sent successfully'; // Return a confirmation response
  }
}
