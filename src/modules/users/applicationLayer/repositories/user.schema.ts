/**
 * importing required packages
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * schema for user
 */
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  display_name: string;
  @Prop({ required: true })
  fcm_token: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
