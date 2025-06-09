/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { GetPrivacyAndPolicyUseCase } from '../../applicationLayer/use-cases/get-privacy-policy.usecase';
import { GetTermsAndConditionsuseCase } from '../../applicationLayer/use-cases/get-terms-condition.usecase';
/**
 * controller for handling documents related routes
 */
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly getTermsAndConditionsuseCase: GetTermsAndConditionsuseCase,
    private readonly getPrivacyAndPolicyUseCase: GetPrivacyAndPolicyUseCase,
  ) {}
  /**
   * get request to terms and condition endpoint
   */

  @HttpCode(HttpStatus.OK)
  @Get('/termsandconditions')
  @UseGuards(JwtAuthGuard)
  async get_terms_and_conditions() {
    return this.getTermsAndConditionsuseCase.execute();
  }
  /**
   * get request to privacy policy
   */
  @HttpCode(HttpStatus.OK)
  @Get('/privacypolicy')
  @UseGuards(JwtAuthGuard)
  async get_privacy_policy() {
    return this.getPrivacyAndPolicyUseCase.execute();
  }
}
