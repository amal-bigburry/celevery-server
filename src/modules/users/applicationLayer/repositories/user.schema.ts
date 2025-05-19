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
 * - password: required field storing the user's password.
 * - display_name: required field for the user's chosen display name.
 * - fcm_token: required field holding the Firebase Cloud Messaging token for push notifications.
 * 
 * This class extends Mongoose Document to inherit database interaction capabilities.
 * ******************************************************************************************************
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
  profile_url: string;

  @Prop({ required: true })
  fcm_token: string;
  
  @Prop({ required: true })
  favourites: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
