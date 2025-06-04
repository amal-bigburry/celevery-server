import { CakeDto } from 'src/common/dtos/cake.dto';

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
    public contact_number_isVerified: Boolean,
    public email: string,
    public password: string,
    public fcm_token: string,
    public profile_url: string,
    public favourites: Array<string>,
  ) {}
}
