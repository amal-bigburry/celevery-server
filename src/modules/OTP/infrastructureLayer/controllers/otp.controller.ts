/**
 * Import the required packages
 */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OTPSendingService } from '../../applicationLayer/usecases/Send.usecase';
import { OTPVerifyingService } from '../../applicationLayer/usecases/Verify.usecase';

/**
 * OTP Controller handles routes related to OTP (One-Time Password) functionality.
 * This controller interacts with the TwilioService to send OTPs to users.
 */
@Controller('otp') // Route for OTP-related actions
export class OtpController {
  constructor(
    private readonly OTPSendingService: OTPSendingService,
    private readonly OTPVerifyingService: OTPVerifyingService,
  ) {} // Inject TwilioService

  /**
   * Route: /otp/send
   * 
   * This endpoint sends an OTP to a specified phone number.
   * @param data - Contains the 'to' phone number where OTP needs to be sent.
   * @returns A confirmation message once OTP is sent.
   */
  @Post('send') // POST request to send OTP
  @HttpCode(HttpStatus.CREATED)
  async sendOtp(@Body() data: { to: string, UUID:string, method:string }) {
    // Call the TwilioService to send OTP
    await this.OTPSendingService.send(
      data.to, 
      data.UUID,
      data.method
    );
    return 'otp send successfully'; // Return a confirmation response
  }

  // @Post('verify') // POST request to send OTP
  // async verifyotp(@Body() data: { UUID: string , OTP:string}) {
  //   // Call the TwilioService to send OTP
  //   let isVerified = await this.OTPVerifyingService.verify(data.UUID, data.OTP)
  //   return isVerified
  // }
}
