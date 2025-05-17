/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing required packages from mongoose and nestjs
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * schema for document
 */
@Schema({ timestamps: true })
export class Documents extends Document {
  /**
   * field to store terms and conditions text
   */
  @Prop({ required: true })
  termsandcondition: string;
  /**
   * field to store privacy policy text
   */
  @Prop({ required: true })
  privacypolicy: string;
}
/**
 * exporting schema definition for documents
 */
export const DocumentSchema = SchemaFactory.createForClass(Documents);
