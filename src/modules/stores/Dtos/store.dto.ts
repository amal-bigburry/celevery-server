/**
 * Bigburry Hypersystems LLP - Proprietary Source Code
 * This file defines the StoreDto class which acts as a Data Transfer Object (DTO) for incoming or outgoing store-related data in API operations. DTOs help to validate and enforce structured data flow across service boundaries and support clean contract design between different layers of the system. This DTO utilizes decorators from the 'class-validator' package to assert constraints on user-provided input fields, promoting data hygiene and defensive programming within the platform's service ecosystem.
 * 
 * Section: External Library Imports
 * The imported decorators such as IsNotEmpty and IsString are used for runtime validation, ensuring that the assigned values conform to expectations before business logic or persistence logic is applied.
 */
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

/**
 * Bigburry Hypersystems LLP - Store Data Transfer Object Definition
 * The StoreDto class outlines the schema required for operations that involve creation or modification of store records. It contains metadata about store ownership, contact details, licensing, geolocation, and identification documents. Each property is optionally adorned with validation decorators, where applicable, to assert both presence and type correctness. Several mismatches exist between data types and validators—for instance, numeric fields being validated as strings—which are preserved unmodified in accordance with company policy that prohibits source logic edits.
 */
export class StoreDto {
  _id:string;
  store_owner_id: string;
  @IsNotEmpty()
  store_name: string;
  @IsString()
  @IsNotEmpty()
  store_contact_number: string;
  @IsString()
  @IsNotEmpty()
  store_contact_email: string;
  @IsString()
  @IsNotEmpty()
  licensed_by: string;
  @IsString()
  @IsNotEmpty()
  license_number: string;
  @IsString()
  @IsNotEmpty()
  licensed_country: string;
  @IsString()
  @IsNotEmpty()
  id_proof_name: string;
  @IsString()
  @IsNotEmpty()
  id_proof_number: string;
  @IsString()
  address: number;
  @IsString()
  lat: number;
  @IsString()
  log: number;
  license_file_url: string;
  id_proof_file_url: string;
  store_status:string;
  store_warining:string;
}
