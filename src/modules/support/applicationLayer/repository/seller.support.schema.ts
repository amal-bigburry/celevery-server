/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This import statement brings in key decorators and schema-related functions from the @nestjs/mongoose package.
 * @Prop is used to define schema fields and their validation rules.
 * @Schema designates a class as a Mongoose schema.
 * SchemaFactory is a utility function used to generate a schema object from the decorated class, which can then be used for database interactions.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This import pulls in the Document class from the Mongoose library.
 * It is used to extend the base class for the schema, enabling the resulting class to behave as a full-fledged Mongoose document.
 * This provides features such as document methods and type-safe database operations.
 */
import { Document } from 'mongoose';

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This class defines the schema for seller support interactions.
 * Decorated with @Schema and configured with timestamps enabled, Mongoose will automatically manage `createdAt` and `updatedAt` timestamps on documents.
 * This schema is intended to log and manage messages associated with seller support use cases.
 */
@Schema({ timestamps: true })
export class sellersupportmodel extends Document {

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This property stores the unique identifier for the user initiating or receiving seller support.
 * It is a required field and must be a string.
 * Ensures that each support entry is linked to a valid user, enabling traceability and personalized service tracking.
 */
  @Prop({ required: true })
  user_id: string;

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This property holds the array of message objects related to the seller support interaction.
 * Each object in the array may contain various structured message data, such as text, timestamp, or metadata.
 * Being required, it ensures that every seller support document captures at least one interaction entry.
 */
  @Prop({ required: true })
  message: Array<object>;

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This property specifies the MQTT topic string used for message routing.
 * MQTT (Message Queuing Telemetry Transport) is commonly used in real-time communication systems.
 * This field must be present in each document to correctly associate messages with their respective topics and support threads.
 */
  @Prop({ required: true })
  mqtt_topic: string;
}

/** 
 * Company: Bigburry Hypersystems LLP
 * 
 * This statement generates a Mongoose schema from the sellersupportmodel class.
 * Using SchemaFactory, it converts the class with its decorator-based metadata into a format that Mongoose can understand and register.
 * This schema can then be integrated with NestJS modules for database connectivity and operations.
 */
export const SellerSupportModel = SchemaFactory.createForClass(sellersupportmodel);
