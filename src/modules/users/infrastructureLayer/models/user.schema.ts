/**
 * ******************************************************************************************************
 * User.schema.ts
 *
 * This schema file for Bigburry Hypersystems LLP defines the User model structure used within the MongoDB
 * database via Mongoose and integrated with the NestJS framework. It specifies the User document properties
 * such as email, password, display name, and FCM token, ensuring required fields and uniqueness constraints
 * where applicable.
 *
 * The schema setup here facilitates validation, persistence, and retrieval of user data, enabling consistent
 * data management and supporting user authentication and notification services across the application.
 * ******************************************************************************************************
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * ******************************************************************************************************
 * User Schema Class
 *
 * Represents the MongoDB User document structure for Bigburry Hypersystems LLP. Fields include:
 * - email: unique identifier and required field for user login.
 * - password: optional field storing the user's password (may be empty for OAuth users).
 * - display_name: required field for the user's chosen display name.
 * - profile_url: optional field storing URL of the user's profile image.
 * - fcm_token: optional field holding the Firebase Cloud Messaging token for push notifications.
 * - favourites: array of objects representing user's favorite items (e.g., cakes).
 * - contact_number: optional string for the user's contact phone number.
 * - contact_number_isVerified: boolean flag indicating if contact number is verified.
 *
 * Extends Mongoose Document to inherit database interaction capabilities.
 * ******************************************************************************************************
 */
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ required: true })
  display_name: string;
  @Prop({ default: '' })
  profile_url: string;
  @Prop()
  fcm_token: string;
  @Prop({ type: [Object], default: [] })
  favourites: object[];
  @Prop({ default: '' })
  contact_number: string;
  @Prop({ default: false })
  contact_number_isVerified: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
