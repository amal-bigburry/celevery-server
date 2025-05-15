/**
 * required packages
 */
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
/**
 * dto for store
 */
export class StoreDto {
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
}
