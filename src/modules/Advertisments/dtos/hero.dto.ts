/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * @fileoverview This file defines the HeroDto class which acts as a Data Transfer Object (DTO)
 * for transmitting hero-related data within the application.
 * DTOs are commonly used to encapsulate and validate data being transferred across different layers,
 * such as from a client to a server or between internal services.
 * This class utilizes class-validator decorators to enforce mandatory fields,
 * thereby enhancing the robustness and reliability of the data being processed.
 *
 * Company: Bigburry Hypersystems LLP
 */

/**
 * Importing decorators from the class-validator package to apply validation rules
 * on the properties of the DTO class.
 * The @IsNotEmpty decorator ensures that the decorated field cannot be null, undefined, or an empty string.
 * The @IsString decorator (although not used here) can be used to enforce string type if needed.
 *
 * Company: Bigburry Hypersystems LLP
 */
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * This class defines the structure and validation rules for the HeroDto used across the application.
 * It ensures that any incoming or outgoing hero data includes the essential properties
 * such as hero_title, hero_content_url, and hero_content_type.
 * Applying validation at the DTO level helps prevent propagation of malformed data and streamlines error handling.
 *
 * Company: Bigburry Hypersystems LLP
 */
export class HeroDto {

  /**
   * Represents the title or headline of the hero content.
   * The @IsNotEmpty decorator ensures that a non-empty string is provided for this field during data submission.
   *
   * Company: Bigburry Hypersystems LLP
   */
  @IsNotEmpty()
  hero_title: string;
  hero_content_url: string;
  hero_content_type: string;
}
