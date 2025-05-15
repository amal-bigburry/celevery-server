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
  async execute(): Promise<string> {
    const document = await this.documentRepository.getPrivacyPolicy();
    return document;
  }
}
