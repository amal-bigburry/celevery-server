/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENT_REPOSITORY } from '../tokens/documentRepository.token';
import { DocumentRepository } from '../repositories/documentRepository.repository';
/**
 * injectable file
 */
@Injectable()
export class GetPrivacyAndPolicyUseCase {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: DocumentRepository,
  ) {}
  /**
   * executable file
   */
  async execute(): Promise<object> {
    const document = await this.documentRepository.getPrivacyPolicy();
    return document;
  }
}
