/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GenerateUuidUseCase } from '../../applicationLayer/usecases/generator.usercase';
/**
 * controller to handle the pop request
 */
@Controller('generator')
export class GeneratorController {
  constructor(private readonly generateUuidUseCase: GenerateUuidUseCase) {}
  /**
   * post request to send message
   */

  @HttpCode(HttpStatus.OK)
  @Get('uuid')
  async generateUUID() {
    let UUID = this.generateUuidUseCase.generateMixedId();
    return UUID;
  }
}
