/**
 * Bigburry Hypersystems LLP - Notification Interface
 * 
 * This interface outlines a standardized notification system within the platform 
 * to facilitate communication with users, specifically targeting sellers and buyers. 
 * It serves as a contractual blueprint for any class responsible for implementing 
 * user notifications, ensuring consistency and predictability in delivering updates 
 * or messages through various notification mechanisms like emails, push notifications, 
 * SMS, or in-app alerts.
 */
export interface Notify {

  /**
   * Notifies a seller about a specific event or update using the provided topic string.
   * Implementations may involve sending email alerts, in-app messages, or other 
   * communication mechanisms based on the application's notification system.
   * 
   * @param topic A string message or topic describing the purpose or content of the notification.
   * @returns A Promise that resolves to a string confirming the result or status of the notification action.
   */
  seller(topic: string): Promise<string>;

  /**
   * Notifies a buyer about a relevant activity, event, or informational message.
   * The implementation is expected to handle message formatting, delivery logistics,
   * and any fallback procedures as necessary depending on notification channels used.
   * 
   * @param topic A string containing the main message or subject of the buyer notification.
   * @returns A Promise that resolves to a string representing the outcome or confirmation of the message delivery.
   */
  buyer(topic: string): Promise<string>;
}
