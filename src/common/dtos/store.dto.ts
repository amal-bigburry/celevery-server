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
  IsISO8601,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { known_fors } from '../utils/known_fors';
import { store_status } from '../utils/store_status';
import { kyc_document_types } from '../utils/kyc_documents';
import { preferred_payment_method } from '../utils/preferredPaymentMethod';

/**
 * Bigburry Hypersystems LLP - Store Data Transfer Object Definition
 * The StoreDto class outlines the schema required for operations that involve creation or modification of store records. It contains metadata about store ownership, contact details, licensing, geolocation, and identification documents. Each property is optionally adorned with validation decorators, where applicable, to assert both presence and type correctness. Several mismatches exist between data types and validators—for instance, numeric fields being validated as strings—which are preserved unmodified in accordance with company policy that prohibits source logic edits.
 */
export class StoreDto {
  vendor_id: string;
  _id: string;
  store_owner_id: string;
  @IsNotEmpty()
  store_name: string;
  @IsNotEmpty()
  store_description: string;
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
  address: number;
  @IsString()
  lat: number;
  @IsString()
  log: number;
  // @IsEnum(store_status, {
  //   message: `Please choose the status from the available ones`,
  // })
  // status: string;
  @IsNotEmpty()
  bank_account_holder_name: string;
  @IsNotEmpty()
  @IsEnum(preferred_payment_method, {
    message: `Please choose the preferred_payment_method from the available ones (UPI, BANK)`,
  })
  preferred_payment_method: string;
  license_file_url: string;
  store_status: string;
  store_warining: string;
  @ValidateIf(
    (o) => o.preferred_payment_method === preferred_payment_method.BANK,
  )
  @IsNotEmpty()
  bank_account_number?: string;
  @ValidateIf(
    (o) => o.preferred_payment_method === preferred_payment_method.BANK,
  )
  @IsNotEmpty()
  bank_ifsc_code?: string;

  @ValidateIf((o) => o.account_type === 'Business')
  @IsNotEmpty()
  gst?: string;
  @ValidateIf((o) => o.account_type === 'Business')
  @IsNotEmpty()
  pan?: string;
  @ValidateIf((o) => o.account_type === 'Business')
  @IsNotEmpty()
  cin?: string;
  @ValidateIf(
    (o) => o.preferred_payment_method === preferred_payment_method.UPI,
  )
  @IsNotEmpty()
  vpa?: string;
  @IsNotEmpty()
  @IsEnum(kyc_document_types, {
    message: `kyc_document_type must be one of UIDAI_FRONT, UIDAI_BACK, DL, PASSPORT_FRONT, PASSPORT_BACK, PAN, VOTER_ID`,
  })
  kyc_document_type: string;
  @IsNotEmpty()
  kyc_document_number: string;
  kyc_document_url: string;
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  sunday_status: boolean;
  @IsNotEmpty()
  @IsEnum(
    { BUSINESS: 'Business', INDIVIDUAL: 'Individual' },
    {
      message: `Please choose the account type from the available ones (Business, Individual)`,
    },
  )
  account_type: string;
  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  sunday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  sunday_close_at: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  monday_status: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  monday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  monday_close_at: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  tuesday_status: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  tuesday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  tuesday_close_at: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  wednesday_status: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  wednesday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  wednesday_close_at: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  thursday_status: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  thursday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  thursday_close_at: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  friday_status: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  friday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  friday_close_at: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  saturday_status: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  saturday_open_at: string;

  @IsNotEmpty()
  @IsString()
  @IsMilitaryTime()
  saturday_close_at: string;
}
