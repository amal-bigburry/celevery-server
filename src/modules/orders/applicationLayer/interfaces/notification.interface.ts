/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Interface for the Notification use case
 */
export interface NotificationInterface {
  /**
   * Executes the sending of a notification
   * @param title - The title of the notification
   * @param message - The body content of the notification
   * @param token - The recipient's token for the notification
   * @returns Promise indicating the status of the notification sending
   */
  execute({title, message, token}): Promise<string>;
}
