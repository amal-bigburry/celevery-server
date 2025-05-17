/**
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * Schema for Cake Categories
 */
@Schema()
export class CakeCategoryDocument extends Document {
  /**
   * Category image url is stored like this
   */
  @Prop({ required: true })
  category_image_url: string;
  /**
   * Category name is stored like this
   */
  @Prop({ required: true, unique: true })
  category_name: string;
}
/**
 * Exports the cake category Model or schema for other packages
 */
export const CakeCategoryModel =
  SchemaFactory.createForClass(CakeCategoryDocument);
