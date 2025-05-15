/**
 * import the required packages
 */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TwilioService } from '../usecases/twilio.otp.usecase';
/**
 * handles the route to orders_placed
 */
@Controller('otp')
export class OtpController {
  constructor(private readonly TwilioService: TwilioService) {}
  /**
   * route /otp/send
   */
  @Post('send')
  async sendOtp(@Body() data: { to: string }) {
    await this.TwilioService.sendOtp(
      data.to,
      'This is a test otp from cake factory 2323. Use it only inside the Application, Thankyou. Have a nice Day.Bye',
    );
    return 'done';
  }
}
