/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * imports the required packages
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Injectable service file to implement mqttservice
 */
@Injectable()
export class GenerateUuidUseCase {
  constructor(private readonly configService: ConfigService) {}
  generateMixedId() {
    const timestamp = Date.now().toString(); // 13 digits
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = timestamp;
    // Add random characters to reach a total length of 30
    while (result.length < 30) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
