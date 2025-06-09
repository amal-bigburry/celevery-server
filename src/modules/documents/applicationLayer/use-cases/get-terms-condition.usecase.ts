/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENT_REPOSITORY } from '../../tokens/documentRepository.token';
import { DocumentRepository } from '../interfaces/document.interface';
/**
 * injectable file to get the terms and condition
 */
@Injectable()
export class GetTermsAndConditionsuseCase {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}
  /**
   * executable file
   */
  async execute(): Promise<object> {
    const document = await this.documentRepository.getTermsAndConditions();
    return document;
  }
}
