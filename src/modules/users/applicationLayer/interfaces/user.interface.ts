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

import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { UserEntity } from '../../domainLayer/entities.ts/user.entity';
import { RegisterDto } from '../../dtos/Register.dto';
import { TokenDto } from '../../dtos/token.dto';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';

/**
 * ******************************************************************************************************
 * UserRepository Interface
 *
 * This interface outlines the contract for any user repository implementation within the Bigburry Hypersystems LLP
 * ecosystem. The primary responsibility of this interface is to provide method signatures for user-related
 * persistence and retrieval operations. These operations include:
 *
 * - findByEmail(email: string): Retrieves a user entity that matches the provided email address. Returns a
 *   Promise resolving to either the UserEntity or null if no user is found.
 *
 * - createUser(RegisterDto: RegisterDto): Accepts a registration DTO and attempts to create a new user in the
 *   data store. Returns a Promise resolving to the created UserEntity or null if creation fails.
 *
 * - updatefcm(userid: string, token: TokenDto): Updates the Firebase Cloud Messaging token associated with the
 *   specified user ID, facilitating push notifications. Returns a Promise resolving to a string status or result.
 *
 * - getfcm(userid: string): Retrieves the current FCM token for a given user ID. Returns a Promise resolving to
 *   the token string.
 *
 * - findById(userid: string): Looks up a user entity by its unique user ID. Returns a Promise resolving to the
 *   UserEntity or null if no user is found.
 *
 * This interface ensures that all user repository implementations conform to a consistent API, enabling
 * interchangeable use and easier testing within the system developed by Bigburry Hypersystems LLP.
 * ******************************************************************************************************
 */
export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity>;
  findByNumber(number: string): Promise<UserEntity|null>;
  createUser(RegisterDto: RegisterDto): Promise<UserEntity | null>;
  updatefcm(userid: string, token: TokenDto): Promise<string>;
  getfcm(userid: string): Promise<string>;
  findById(userid: string): Promise<UserEntity | null>;
  updateProfileImage(userid: string, file): Promise<string>;
  addFavourite(userid: string, cake_id:string): Promise<string>;
  removeFavourite(userid: string, cake_id:string): Promise<string>;
  getFavourite(userid: string): Promise<Array<CakeEntity>>;
  updateContactNumber(userid:string, contact_number:string):Promise<string>;
  updatePassword(email:string, password:string):Promise<string>;
  createGoogleUser(email:string, profile_url:string, display_name:string):Promise<UserEntity>;
}
