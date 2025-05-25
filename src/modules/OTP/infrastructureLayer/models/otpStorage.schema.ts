import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // No timestamps here
export class OTPStorage extends Document {
  @Prop({ required: true })
  OTP: string;

  @Prop({ required: true })
  UUID: string;

  // TTL: Deletes document after 5 minutes of expiresAt timestamp
  @Prop({ default: () => new Date(), expires: 300 })
  expiresAt: Date;

  @Prop({ default: false })
  used: boolean;

  @Prop({ default: 0 })
  attempts: number;

  @Prop({ default: () => new Date() })
  last_request_time: Date;
}

export const OTPStorageSchema = SchemaFactory.createForClass(OTPStorage);
