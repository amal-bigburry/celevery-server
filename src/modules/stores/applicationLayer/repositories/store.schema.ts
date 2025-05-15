/**
 * importing required packages
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * schema of linse details
 */
@Schema()
export class licenseDetails extends Document {
  @Prop()
  licensed_by: string;
  @Prop()
  license_number: string;
  @Prop()
  license_file_url: string;
  @Prop()
  licensed_country: string;
  @Prop()
  id_proof_name: string;
  @Prop()
  id_proof_number: string;
  @Prop()
  id_proof_file_url: string;
}
/**
 * schena for the store
 */
@Schema({ timestamps: true })
export class Store extends Document {
  @Prop({ required: true })
  store_owner_id: string;
  @Prop({ required: true, unique: true })
  store_name: string;
  @Prop({ required: true })
  store_contact_number: string;
  @Prop({ required: true })
  store_contact_email: string;
  @Prop({ required: true, type: licenseDetails })
  store_license_details: licenseDetails;
  @Prop() address: string;
  @Prop() lat: number;
  @Prop() log: number;
}
export const StoreModal = SchemaFactory.createForClass(Store);
