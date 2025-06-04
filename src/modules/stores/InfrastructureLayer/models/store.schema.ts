/**
 * importing required packages
 *
 * The following packages are imported to define MongoDB schemas and interact with MongoDB collections using
 * NestJS and Mongoose. The `@nestjs/mongoose` package provides the necessary decorators and helpers, while
 * the `mongoose` package is used for interacting with MongoDB directly.
 *
 * - `Prop`: Used to define properties in a Mongoose schema.
 * - `Schema`: Used to define the structure of a MongoDB document.
 * - `SchemaFactory`: A helper function that converts the class-based schema into a Mongoose schema.
 * - `Document`: The base class that represents a Mongoose document.
 *
 * Company: BigBurry Hypersystems LLP
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { STORE_STATUS, STORE_WARNINGS } from 'src/common/utils/contants';

/**
 * The `licenseDetails` class represents the schema for storing license-related details of a store.
 * It includes various properties such as the name of the entity that licensed the store, the license
 * number, and the URLs of the license and ID proof files.
 *
 * The properties defined in this schema are:
 * - `licensed_by`: A string representing the entity that issued the license.
 * - `license_number`: The unique identifier for the license.
 * - `license_file_url`: URL to access the license file.
 * - `licensed_country`: The country where the store is licensed.
 * - `id_proof_name`: The name on the identification proof document.
 * - `id_proof_number`: The identification number associated with the ID proof.
 * - `id_proof_file_url`: URL to access the ID proof file.
 *
 * Company: BigBurry Hypersystems LLP
 */
@Schema({ timestamps: true })
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
  kyc_document_type: string;
  @Prop()
  kyc_document_number: string;
  @Prop()
  kyc_document_url: string;
}

/**
 * The `Store` class represents the schema for the store entity. It contains information related to the store
 * such as the owner's details, contact information, license details, and physical location.
 *
 * The properties defined in this schema are:
 * - `store_owner_id`: The unique identifier of the store owner.
 * - `store_name`: The name of the store (must be unique).
 * - `store_contact_number`: The contact phone number for the store.
 * - `store_contact_email`: The contact email address for the store.
 * - `store_license_details`: An embedded object that holds the `licenseDetails` schema, which contains
 *   license and ID proof information.
 * - `address`: The physical address of the store.
 * - `lat`: The latitude of the store's location (optional).
 * - `log`: The longitude of the store's location (optional).
 *
 * The `Store` schema also includes `timestamps: true`, which automatically adds `createdAt` and `updatedAt`
 * fields to the schema for tracking when the document was created and last modified.
 *
 * Company: BigBurry Hypersystems LLP
 */
@Schema({ timestamps: true })
export class Store extends Document {
  @Prop({ required: true })
  store_owner_id: string;
  @Prop({ required: true, unique: true })
  store_name: string;
  @Prop({ required: true, unique: true })
  store_description:string;
  @Prop({ required: true })
  store_contact_number: string;
  @Prop({ required: true })
  store_contact_email: string;
  @Prop({ required: true, default: STORE_STATUS.REQUESTED })
  store_status: string;
  @Prop({ default: STORE_WARNINGS.REQUESTED, required: true })
  store_warnings: string;
  @Prop({ required: true, type: licenseDetails })
  store_license_details: licenseDetails;
  @Prop() address: string;
  @Prop() lat: number;
  @Prop() log: number;
  @Prop({ required: true }) sunday_status: boolean;
  @Prop({ required: true }) sunday_open_at: string;
  @Prop({ required: true }) sunday_close_at: string;
  @Prop({ required: true }) monday_status: boolean;

  @Prop({ required: true }) monday_open_at: string;

  @Prop({ required: true }) monday_close_at: string;

  @Prop({ required: true }) tuesday_status: boolean;

  @Prop({ required: true }) tuesday_open_at: string;

  @Prop({ required: true }) tuesday_close_at: string;

  @Prop({ required: true }) wednesday_status: boolean;

  @Prop({ required: true }) wednesday_open_at: string;

  @Prop({ required: true }) wednesday_close_at: string;

  @Prop({ required: true }) thursday_status: boolean;

  @Prop({ required: true }) thursday_open_at: string;

  @Prop({ required: true }) thursday_close_at: string;

  @Prop({ required: true }) friday_status: boolean;

  @Prop({ required: true }) friday_open_at: string;

  @Prop({ required: true }) friday_close_at: string;

  @Prop({ required: true }) saturday_status: boolean;

  @Prop({ required: true }) saturday_open_at: string;

  @Prop({ required: true }) saturday_close_at: string;
}

/**
 * The `StoreModel` is the Mongoose model that is created from the `Store` schema using the
 * `SchemaFactory.createForClass()` function. This model will be used to interact with the `stores`
 * collection in the MongoDB database, providing methods for CRUD operations and querying.
 *
 * Company: BigBurry Hypersystems LLP
 */
export const StoreModel = SchemaFactory.createForClass(Store);
