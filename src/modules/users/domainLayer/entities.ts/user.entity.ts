import { CakeDto } from "src/modules/cakes/dtos/cake.dto";

/**
 * ******************************************************************************************************
 * UserEntity.ts
 *
 * This class represents the User entity for Bigburry Hypersystems LLP, encapsulating core user properties
 * and domain logic related to user data modifications. It provides a clear structure for user information
 * and enforces basic validation rules within protected methods for changing sensitive fields such as email,
 * password, and display name.
 *
 * The design ensures that any changes to user data go through controlled methods, maintaining integrity and
 * adhering to business rules.
 * ******************************************************************************************************
 */
export class UserEntity {
  constructor(
    public readonly _id: string,
    public display_name: string,
    public contact_number: string,
    public contact_number_isVerified:Boolean,
    public email: string,
    public password: string,
    public fcm_token: string,
    public profile_url: string,
    public favourites:Array<string>,
  ) {}

  /**
   * **************************************************************************************************
   * changeEmail Method
   *
   * Protected method to update the user's email address. It validates the new email format by checking
   * the presence of '@' character. Throws an error if the email is invalid to prevent incorrect data.
   * **************************************************************************************************
   */
  // protected changeEmail(newEmail: string) {
  //   if (!newEmail.includes('@')) throw new Error('Invalid email');
  //   this.email = newEmail;
  // }

  // /**
  //  * **************************************************************************************************
  //  * changePassword Method
  //  *
  //  * Protected method to update the user's password. Enforces a minimum length of 8 characters to ensure
  //  * basic password strength. Throws an error if the password is too short.
  //  * **************************************************************************************************
  //  */
  // protected changePassword(newPassword: string) {
  //   if (newPassword.length < 8) throw new Error('Password too short');
  //   this.password = newPassword;
  // }

  // /**
  //  * **************************************************************************************************
  //  * changeDisplayName Method
  //  *
  //  * Protected method to update the user's display name. This method allows changing the display name
  //  * without additional validation, assuming any string is acceptable.
  //  * **************************************************************************************************
  //  */
  // protected changeDisplayName(newDisplayName: string) {
  //   this.display_name = newDisplayName;
  // }

  // protected changeProfileImage(profile_url: string) {
  //   this.profile_url = profile_url;
  // }
}
