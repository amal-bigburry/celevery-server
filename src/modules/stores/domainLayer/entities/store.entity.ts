/**
 * Store entity
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
  ) {}
  /**
   * change email
   */
  protected changeEmail(newEmail: string) {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this.store_contact_email = newEmail;
  }
  /**
   * change contact number
   */
  protected changeContactNumber(newnumber: string) {
    if (newnumber.length < 8) throw new Error('Password too short');
    this.store_contact_number = newnumber;
  }
  /**
   * change liicense number
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
