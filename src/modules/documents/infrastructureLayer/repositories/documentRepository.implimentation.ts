/**
 * importing required packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentRepository } from '../../applicationLayer/repositories/documentRepository.repository';
import { DocumentEntity } from '../../domainLayer/document.entity';
import { BadRequestException } from '@nestjs/common';
/**
 * implimenting docuemt repository
 */
export class DocumentRepositoryImpl implements DocumentRepository {
  constructor(
    @InjectModel('Documents') private Documents: Model<DocumentEntity>,
  ) {}
  async getPrivacyPolicy(): Promise<string> {
    let doc = await this.Documents.findOne()
      .sort({ createdAt: -1 }) // Sort by createdAt descending
      .exec();
    if (doc) {
      return doc.privacypolicy;
    } else throw new BadRequestException('No doc found in db');
  }
  /**
   * overrigint the function
   */
  async getTermsAndConditions(): Promise<string> {
    let doc = await this.Documents.findOne()
      .sort({ createdAt: -1 }) // Sort by createdAt descending
      .exec();
    if (doc) {
      return doc.termsandcondition;
    } else throw new BadRequestException('No doc found in db');
  }
}
