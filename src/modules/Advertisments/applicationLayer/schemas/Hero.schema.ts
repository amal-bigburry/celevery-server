/**
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * @fileoverview This file defines the Mongoose schema for the HeroDocument class using the NestJS-Mongoose integration.
 * It models the structure of hero data stored in the database and ensures type safety and validation rules at the schema level.
 * The schema includes mandatory fields to capture essential attributes such as title, content URL, and content type.
 * This setup is essential for mapping application-level data to persistent storage effectively.
 *
 * Company: Bigburry Hypersystems LLP
 */

/**
 * Importing necessary modules from the NestJS Mongoose package to define schema decorators and factories.
 * The Document class from Mongoose is extended to inherit database document behavior and properties.
 *
 * Company: Bigburry Hypersystems LLP
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * This class defines the schema for the hero document which represents a media or content entry labeled as a hero.
 * It is annotated with the @Schema decorator to denote it as a database schema for Mongoose.
 * The class extends Mongoose's Document class to inherit MongoDB-specific document handling features.
 *
 * Company: Bigburry Hypersystems LLP
 */
@Schema()
export class HeroDocument extends Document {
  /**
   * Represents the title or headline text associated with the hero content.
   * This field is mandatory to ensure that every hero record includes a descriptive label.
   *
   * Company: Bigburry Hypersystems LLP
   */
  @Prop({ required: true })
  hero_title: string;

  /**
   * Represents the URL pointing to the media asset (image or video) associated with the hero content.
   * This field is required to maintain a direct reference to where the hero content is hosted.
   *
   * Company: Bigburry Hypersystems LLP
   */
  @Prop({ required: true })
  hero_content_url: string;

  /**
   * Specifies the type of content represented by the hero, such as 'image', 'video', etc.
   * This field ensures the application can differentiate between various content formats.
   *
   * Company: Bigburry Hypersystems LLP
   */
  @Prop({ required: true })
  hero_content_type: string;
}

/**
 * This statement generates the Mongoose schema from the HeroDocument class definition.
 * The schema is exported for use in other modules where interaction with the hero collection is required.
 * This facilitates modular usage and centralized schema management for data integrity and structure enforcement.
 *
 * Company: Bigburry Hypersystems LLP
 */
export const HeroSchema = SchemaFactory.createForClass(HeroDocument);
