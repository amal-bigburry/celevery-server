/**
 * import the required packages
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * schema for user model
 */
@Schema({timestamps:true})
export class Order extends Document {
  /**
   * cake id
   */
  @Prop()
  payment_tracking_id: string;
  /**
   * cake id
   */
  @Prop({ required: true })
  cake_id: string;
  /**
   * status of the order
   */
  @Prop({ required: true })
  order_status: string;
  /**
   * variant id of the cake
   */
  @Prop({ required: true })
  cake_variant_id: string;
  /**
   * maximum time buyer can wait
   */
  @Prop({ required: true })
  need_before: string;
  /**
   * user id of the order
   */
  @Prop({ required: true })
  buyer_id: string;
  @Prop({ required: true })
  seller_id: string;
}
/**
 * exporting the user schema
 */
export const OrderSchema = SchemaFactory.createForClass(Order);
