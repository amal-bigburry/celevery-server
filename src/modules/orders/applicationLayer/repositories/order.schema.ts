/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */

/**
 * Import the required packages
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Schema for user order model
 */
@Schema({timestamps:true})
export class Order extends Document {
  
  /**
   * Payment tracking ID for the order
   */
  @Prop()
  payment_tracking_id: string;

  /**
   * The ID of the cake being ordered
   */
  @Prop({ required: true })
  cake_id: string;

  /**
   * The current status of the order
   */
  @Prop({ required: true })
  order_status: string;

  /**
   * The variant ID of the ordered cake
   */
  @Prop({ required: true })
  cake_variant_id: string;

  /**
   * The maximum time the buyer can wait for the order
   */
  @Prop({ required: true })
  need_before: string;

  /**
   * The user ID of the buyer who placed the order
   */
  @Prop({ required: true })
  buyer_id: string;

  /**
   * The 'known for' attribute of the cake being ordered
   */
  @Prop({ required: true })
  known_for: string;

  /**
   * The seller ID who is fulfilling the order
   */
  @Prop({ required: true })
  seller_id: string;
  @Prop({ required: true })
  text_on_cake:string;
}

/**
 * Exporting the Order schema
 */
export const OrderSchema = SchemaFactory.createForClass(Order);
