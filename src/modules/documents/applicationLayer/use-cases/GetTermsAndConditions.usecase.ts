/**
 * importing required packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENT_REPOSITORY } from '../tokens/documentRepository.token';
import { DocumentRepository } from '../repositories/documentRepository.repository';
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
  async execute(): Promise<string> {
    const document = await this.documentRepository.getTermsAndConditions();
    return document;
  }
}
