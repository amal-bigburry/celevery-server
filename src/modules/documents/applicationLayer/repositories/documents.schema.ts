// infrastructureLayer/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * schema for document 
 */
@Schema({ timestamps: true })
export class Documents extends Document {
  @Prop({ required: true })
  termsandcondition: string;
  @Prop({ required: true })
  privacypolicy: string;
}
export const DocumentSchema = SchemaFactory.createForClass(Documents);
