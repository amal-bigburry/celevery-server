/**
 * user entity
 */
export class UserEntity {
  constructor(
    public readonly _id: string,
    public display_name: string,
    public contact_number: string,
    public email: string,
    public password: string,
    public fcm_token: string,
  ) {}
  /**
   * helps to change the email
   */
  protected changeEmail(newEmail: string) {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this.email = newEmail;
  }
  /**
   * helps to change the user password
   */
  protected changePassword(newPassword: string) {
    if (newPassword.length < 8) throw new Error('Password too short');
    this.password = newPassword;
  }
  /**
   * helps to change the displa name
   */
  protected changeDisplayName(newDisplayName: string) {
    this.display_name = newDisplayName;
  }
}
