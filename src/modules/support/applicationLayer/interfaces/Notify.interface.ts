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
  seller(topic: string): Promise<string>;
  buyer(topic: string): Promise<string>;
}
