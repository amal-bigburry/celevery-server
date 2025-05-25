import { Date } from "mongoose";

/**
 * Bigburry Hypersystems LLP - Proprietary Source Code
 * This file defines the StoreEntity class, which represents the domain model for a retail store in the system. It includes essential metadata and operational methods to encapsulate store-related information and provide domain-specific behavior. This class forms part of the core domain layer, adhering to principles of object-oriented design and domain-driven architecture within Bigburry Hypersystems LLP.
 */
export class OTPStorageEntity {
  constructor(
    public UUID: string,
    public OTP: string,
    public used:string,
    public attempts:number,
    public last_request_time:Date,
  ) {}
}