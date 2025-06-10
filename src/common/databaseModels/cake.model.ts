/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

/**
 * Schema representing the CakeVariant embedded document
 */
@Schema({ timestamps: true, _id: true }) // ✅ Enable _id for subdocuments
export class CakeVariant {
  /**
   * MongoDB ObjectId for the cake variant
   */
  @Prop({ type: String, default: () => new mongoose.Types.ObjectId() }) // Optional: Explicitly define _id
  _id: string;

  /**
   * Preparation time in minutes for this cake variant
   */
  @Prop() preparation_time: number;

  /**
   * Weight of the cake variant
   */
  @Prop() weight: number;

  /**
   * Maximum retail price of the cake variant
   */
  @Prop() cake_mrp: number;

  /**
   * Selling price of the cake variant
   */
  @Prop() cake_price: number;
}

/**
 * Main schema for Cake document in the database
 */
@Schema()
export class Cake extends Document {
  /**
   * Stores the name of the cake (required)
   */
  @Prop({ required: true })
  cake_name: string;

  /**
   * Stores description of the cake
   */
  @Prop()
  cake_description: string;

  /**
   * Stores array of image URLs uploaded for the cake (required)
   */
  @Prop({ required: true })
  cake_image_urls: Array<string>;

  /**
   * Indicates what the cake is known for (e.g., birthday) (required)
   */
  @Prop({ required: true })
  known_for: string;

  /**
   * Embedded array of cake variant objects with pricing and preparation details
   */
  @Prop({ type: [CakeVariant], required: true }) // ✅ Correct way to embed nested object
  cake_variants: CakeVariant[];

  /**
   * Identifier for the store this cake belongs to
   */
  @Prop()
  store_id: string;

  /**
   * Array of category IDs this cake belongs to (required)
   */
  @Prop({ required: true })
  cake_category_ids: Array<string>;

  /**
   * Rating value assigned to the cake
   */
  @Prop()
  cake_rating: number;
}

/**
 * Creates Mongoose schema for Cake class
 */
export const CakeSchema = SchemaFactory.createForClass(Cake);
