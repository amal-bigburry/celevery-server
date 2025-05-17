/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This import statement brings in necessary decorators and utilities from the @nestjs/mongoose package.
 * These include @Prop for defining properties of schema fields, @Schema for declaring a class as a Mongoose schema,
 * and SchemaFactory which facilitates the creation of a schema object based on a decorated class.
 * These are essential for structuring Mongoose models within a NestJS application.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * Company: Bigburry Hypersystems LLP
 * 
 * This import brings in the Document class from Mongoose.
 * It is a crucial component for schema inheritance in TypeScript, allowing the schema class to behave like a Mongoose document.
 * This enables type safety and IntelliSense support across the codebase where this schema is utilized.
 */
import { Document } from 'mongoose';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This schema decorator marks the class as a Mongoose schema and enables timestamping.
 * By setting the timestamps option to true, Mongoose will automatically manage `createdAt` and `updatedAt` properties for documents of this model.
 * This is useful for tracking when records are created and modified within the database.
 */
@Schema({ timestamps: true })
export class buyersupportmodel extends Document {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This property represents the identifier of the user.
 * It is marked as required, indicating that any document created from this schema must include a `user_id`.
 * It is stored as a string and typically used to associate messages with a specific user in the application.
 */
  @Prop({ required: true })
  user_id: string;

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This property holds the conversation or messages exchanged with the buyer.
 * It is defined as an array of objects, implying that each entry may contain structured data such as message content, timestamps, or metadata.
 * This field is also required to ensure the model always maintains a record of communication.
 */
  @Prop({ required: true })
  message: Array<object>;

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This field represents the MQTT topic to which the message corresponds.
 * MQTT topics are used in publish-subscribe communication models, especially in IoT and messaging systems.
 * Marked as required, this field ensures that each document has a valid MQTT routing context.
 */
  @Prop({ required: true })
  mqtt_topic: string;
}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This statement generates a Mongoose schema based on the decorated class definition.
 * It utilizes SchemaFactory provided by @nestjs/mongoose to convert the class into a schema object.
 * The resulting schema can then be registered with a Mongoose module to facilitate database operations.
 */
export const BuyerSupportModel = SchemaFactory.createForClass(buyersupportmodel);
