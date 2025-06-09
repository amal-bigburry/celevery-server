/**
 * ******************************************************************************************************
 * UserRepository.interface.ts
 *
 * This file, developed by Bigburry Hypersystems LLP, serves as a foundational contract within the domain
 * architecture of the application. It defines the UserRepository interface which outlines the essential
 * methods required for managing user data and operations related to user accounts.
 *
 * The interface specifies asynchronous operations such as finding a user by their email or unique identifier,
 * creating a new user based on a registration data transfer object (DTO), and managing FCM (Firebase Cloud
 * Messaging) tokens for push notification services. Each method is designed to return promises that resolve
 * to either a UserEntity object or relevant success indicators, ensuring consistent handling of asynchronous
 * data access and updates.
 *
 * By abstracting these operations into an interface, Bigburry Hypersystems LLP ensures that different
 * implementations of user data handling can be easily integrated without affecting the higher-level business
 * logic, promoting flexibility and maintainability across the software system.
 * ******************************************************************************************************
 */

import { OTPStorageEntity } from "../../domainLayer/entities/otp-storage.entity";

export interface OTPStorageRepository {
  create(UUID: string, OTP:string): Promise<string>;
  get(UUID: string): Promise<string>;
  markAsUsed(UUID: string): Promise<string>;
  isUUIDExist(UUID: string): Promise<boolean>;
  isUsed(UUID: string): Promise<boolean>;
  getOTPDocOf(UUID: string): Promise<OTPStorageEntity>;
  increaseAttempt(UUID:string, currentAttemps:number):Promise<number>;
  updateLastRequestTime(UUID:string, time:Date):Promise<boolean>;
}
