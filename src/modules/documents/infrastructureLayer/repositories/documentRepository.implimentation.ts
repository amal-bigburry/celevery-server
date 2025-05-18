/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing required packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentRepository } from '../../applicationLayer/repositories/documentRepository.repository';
import { DocumentEntity } from '../../domainLayer/document.entity';
import { BadRequestException } from '@nestjs/common';
/**
 * implementing document repository
 */
export class DocumentRepositoryImpl implements DocumentRepository {
  constructor(
    @InjectModel('Documents') private Documents: Model<DocumentEntity>,
  ) {}
  /**
   * retrieves the privacy policy from the database
   */
  async getPrivacyPolicy(): Promise<object> {
    let doc = await this.Documents.findOne()
      .sort({ createdAt: -1 }) // Sort by createdAt descending
      .exec();
    if (doc) {
      return {"html":doc.privacypolicy};
    } else throw new BadRequestException('No doc found in db');
  }
  /**
   * overriding the function to retrieve terms and conditions
   */
  async getTermsAndConditions(): Promise<object> {
    let doc = await this.Documents.findOne()
      .sort({ createdAt: -1 }) // Sort by createdAt descending
      .exec();
    if (doc) {
      return {"html":doc.termsandcondition};
    } else throw new BadRequestException('No doc found in db');
  }
}
