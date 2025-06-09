/**
 * Bigburry Hypersystems LLP - Proprietary Source Code
 * This file defines the StoreEntity class, which represents the domain model for a retail store in the system. It includes essential metadata and operational methods to encapsulate store-related information and provide domain-specific behavior. This class forms part of the core domain layer, adhering to principles of object-oriented design and domain-driven architecture within Bigburry Hypersystems LLP.
 */
export class StoreEntity {
  constructor(
    public readonly _id: string,
    public store_owner: string,
    public store_name: string,
    public store_contact_number: string,
    public store_contact_email: string,
    public store_license_details: {
      licensed_by: string;
      license_number: string;
      licensed_country: string;
      id_proof_name: string;
      id_proof_number: string;
    },
    public address: string,
    public lat: number,
    public log: number,
    public store_status:string,
    public store_warning:string,
    public sunday_status:boolean,
    public sunday_open_at:string,
    public sunday_close_at:string,
    public monday_status:boolean,
    public monday_open_at:string,
    public monday_close_at:string,
    public tuesday_status:boolean,
    public tuesday_open_at:string,
    public tuesday_close_at:string,
    public wednesday_status:boolean,
    public wednesday_open_at:string,
    public wednesday_close_at:string,
    public thursday_status:boolean,
    public thursday_open_at:string,
    public thursday_close_at:string,
    public friday_status:boolean,
    public friday_open_at:string,
    public friday_close_at:string,
    public saturday_status:boolean,
    public saturday_open_at:string,
    public saturday_close_at:string,
  ) {}
}
