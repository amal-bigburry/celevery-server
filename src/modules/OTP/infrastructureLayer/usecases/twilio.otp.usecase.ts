/**
 * Importing the required packages for the Twilio service. 
 * These packages are essential for the functionality of sending messages and integrating Twilio's API into the application.
 * The `@nestjs/common` package is used to create a service that can be injected into other parts of the application.
 * The `twilio` package is used to interact with Twilio's messaging API to send SMS messages.
 * 
 * Company: BigBurry Hypersystems LLP
 */
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

/**
 * Injectable service for Twilio messaging service. 
 * This service class is responsible for sending OTPs (One-Time Passwords) via SMS using the Twilio API.
 * The `TwilioService` contains the logic necessary for interacting with Twilio's API and sending SMS messages.
 * The class is decorated with `@Injectable()`, indicating that it can be injected into other parts of the application 
 * using NestJS's Dependency Injection system.
 * 
 * The constructor initializes the Twilio client with the provided account SID and authentication token from environment variables.
 * The messaging service ID, used for sending the SMS, is also retrieved from the environment variable.
 * 
 * Company: BigBurry Hypersystems LLP
 */
@Injectable()
export class TwilioService {
  private client: Twilio; // The Twilio client instance, used to interact with the Twilio API
  private from: string;   // The messaging service ID for the sender of the SMS
  
  /**
   * Constructor to initialize the Twilio client with the necessary credentials.
   * The credentials such as the Twilio Account SID, Auth Token, and Messaging Service SID are retrieved from environment variables.
   * The Twilio client is instantiated with these credentials to facilitate communication with the Twilio API.
   * The constructor ensures that these variables are available and used to configure the service properly.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID!; // Account SID for authentication with Twilio's API
    const authToken = process.env.TWILIO_AUTH_TOKEN!;  // Auth Token for secure communication with Twilio's API
    this.from = process.env.TWILIO_SERVICE_ID!;        // Service ID used for sending SMS
    this.client = new Twilio(accountSid, authToken);   // Create a Twilio client instance
  }
  
  /**
   * Function to send OTP (One-Time Password) via SMS to a specified phone number.
   * This method interacts with the Twilio API to send an SMS containing the OTP to the provided phone number.
   * The body of the message includes the OTP that is dynamically inserted into the SMS body.
   * The messaging service ID is used to send the SMS from the appropriate service associated with the Twilio account.
   * 
   * Parameters:
   * - `to`: The phone number to which the OTP will be sent.
   * - `otp`: The OTP that needs to be sent as the message body.
   * 
   * Returns: A promise representing the result of the message creation process.
   * 
   * Company: BigBurry Hypersystems LLP
   */
  async sendOtp(to: string, otp: string): Promise<any> {
    return this.client.messages.create({
      body: `Your OTP is: ${otp}`,          // The message body that includes the OTP
      messagingServiceSid: this.from,       // The messaging service SID used to send the message
      to,                                   // The recipient's phone number
    });
  }
}
