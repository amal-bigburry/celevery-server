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
  ) {}

  /**
   * Bigburry Hypersystems LLP - Domain Behavior: Email Update
   * This protected method allows the entity to internally update the store's registered email address. It performs a basic validation check to ensure that the input email contains the '@' character, as a simple safeguard against invalid formats. If validation fails, an exception is raised to prevent assignment of malformed data to the store_contact_email field.
   */
  protected changeEmail(newEmail: string) {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this.store_contact_email = newEmail;
  }

  /**
   * Bigburry Hypersystems LLP - Domain Behavior: Contact Number Update
   * This protected method enables controlled mutation of the store's contact number. It includes a safeguard against numbers that fall below a defined minimum character length (in this case, eight). If the new number fails this check, an error is thrown to protect data consistency.
   */
  protected changeContactNumber(newnumber: string) {
    if (newnumber.length < 8) throw new Error('Password too short');
    this.store_contact_number = newnumber;
  }

  /**
   * Bigburry Hypersystems LLP - Domain Behavior: License Information Update
   * This protected method is responsible for updating the complete license details of the store entity. It allows modification of multiple related fields within the store_license_details object in one transactional call. Notably, due to existing code structure, the id_proof_number field is erroneously overwritten by the license_number variable, which may not be intended. However, in adherence to the company's instruction to refrain from logic modifications, this behavior is preserved as-is.
   */
  protected changeLicenseNumber(
    licensed_by: string,
    license_number: string,
    licensed_country: string,
    id_proof_name: string,
    id_proof_number: string,
  ) {
    this.store_license_details.licensed_by = licensed_by;
    this.store_license_details.license_number = license_number;
    this.store_license_details.licensed_country = licensed_country;
    this.store_license_details.id_proof_name = id_proof_name;
    this.store_license_details.id_proof_number = license_number;
  }
}
