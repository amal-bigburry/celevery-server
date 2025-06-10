/**
 * Bigburry Hypersystems LLP - Proprietary Source Code
 * This file defines the StoreDto class which acts as a Data Transfer Object (DTO) for incoming or outgoing store-related data in API operations. DTOs help to validate and enforce structured data flow across service boundaries and support clean contract design between different layers of the system. This DTO utilizes decorators from the 'class-validator' package to assert constraints on user-provided input fields, promoting data hygiene and defensive programming within the platform's service ecosystem.
 *
 * Section: External Library Imports
 * The imported decorators such as IsNotEmpty and IsString are used for runtime validation, ensuring that the assigned values conform to expectations before business logic or persistence logic is applied.
 */
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsMilitaryTime,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { kyc_document_types } from '../utils/kyc_documents';
import { preferred_payment_method } from '../utils/preferredPaymentMethod';

/**
 * Bigburry Hypersystems LLP - Store Data Transfer Object Definition
 * The StoreDto class outlines the schema required for operations that involve creation or modification of store records. It contains metadata about store ownership, contact details, licensing, geolocation, and identification documents. Each property is optionally adorned with validation decorators, where applicable, to assert both presence and type correctness. Several mismatches exist between data types and validators—for instance, numeric fields being validated as strings—which are preserved unmodified in accordance with company policy that prohibits source logic edits.
 */
export class UpdateStoreDto {
  vendor_id: string;
  store_owner_id: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  store_name: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  store_description: string;
  @IsOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  store_contact_number: string;
  @IsOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  store_contact_email: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  licensed_by: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  license_number: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  licensed_country: string;
  @IsOptional()
  @IsString()
  address: number;
  @IsOptional()
  @IsNotEmpty()
  lat: number;
  @IsNotEmpty()
  @IsOptional()
  log: number;
  @IsOptional()
  @IsNotEmpty()
  bank_account_holder_name: string;
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(preferred_payment_method, {
    message: `Please choose the preferred_payment_method from the available ones (UPI, BANK)`,
  })
  preferred_payment_method: string;
  license_file_url: string;
  store_status: string;
  store_warining: string;
  @IsOptional()
  @ValidateIf(
    (o) => o.preferred_payment_method === preferred_payment_method.BANK,
  )
  @IsNotEmpty()
  bank_account_number?: string;
  @IsOptional()
  @ValidateIf(
    (o) => o.preferred_payment_method === preferred_payment_method.BANK,
  )
  @IsNotEmpty()
  @IsOptional()
  bank_ifsc_code?: string;
  @IsOptional()
  @ValidateIf((o) => o.account_type === 'Business')
  @IsNotEmpty()
  gst?: string;
  @IsOptional()
  @ValidateIf((o) => o.account_type === 'Business')
  @IsNotEmpty()
  pan?: string;
  @IsOptional()
  @ValidateIf((o) => o.account_type === 'Business')
  @IsNotEmpty()
  cin?: string;
  @IsOptional()
  @ValidateIf(
    (o) => o.preferred_payment_method === preferred_payment_method.UPI,
  )
  @IsNotEmpty()
  @IsOptional()
  vpa?: string;
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(kyc_document_types, {
    message: `kyc_document_type must be one of UIDAI_FRONT, UIDAI_BACK, DL, PASSPORT_FRONT, PASSPORT_BACK, PAN, VOTER_ID`,
  })
  kyc_document_type: string;
  @IsOptional()
  @IsNotEmpty()
  kyc_document_number: string;
  kyc_document_url: string;
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  sunday_status: boolean;
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(
    { BUSINESS: 'Business', INDIVIDUAL: 'Individual' },
    {
      message: `Please choose the account type from the available ones (Business, Individual)`,
    },
  )
  account_type: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  sunday_open_at: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  sunday_close_at: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  monday_status: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  monday_open_at: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  monday_close_at: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  tuesday_status: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  tuesday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsMilitaryTime()
  tuesday_close_at: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  wednesday_status: boolean;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsMilitaryTime()
  wednesday_open_at: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  wednesday_close_at: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  thursday_status: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  thursday_open_at: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  thursday_close_at: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  friday_status: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  friday_open_at: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  friday_close_at: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  saturday_status: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  saturday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsMilitaryTime()
  saturday_close_at: string;
}
