/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { GetPrivacyAndPolicyUseCase } from '../../applicationLayer/use-cases/GetPrivacyAndPolicy.usecase';
import { GetTermsAndConditionsuseCase } from '../../applicationLayer/use-cases/GetTermsAndConditions.usecase';
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
  @Get('/termsandconditions')
  @UseGuards(JwtAuthGuard)
  async get_terms_and_conditions() {
    return this.getTermsAndConditionsuseCase.execute();
  }
  /**
   * get request to privacy policy
   */
  @Get('/privacypolicy')
  @UseGuards(JwtAuthGuard)
  async get_privacy_policy() {
    return this.getPrivacyAndPolicyUseCase.execute();
  }
}
