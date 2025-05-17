// infrastructureLayer/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * schema for document 
 */
@Schema({ timestamps: true })
export class buyersupportmodel extends Document {
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
  message: Array<object>;
  @Prop({ required: true })
  mqtt_topic: string;
}
export const BuyerSupportModel = SchemaFactory.createForClass(buyersupportmodel);
