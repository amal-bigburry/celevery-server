/**
 * Company: Bigburry Hypersystems LLP
 * 
 * This file exports a unique Symbol used as an injection token for creating
 * buyer support instances within the application. This token acts as an identifier
 * in the dependency injection container to resolve the correct implementation.
 */
export const CREATE_BUYER_TOKEN = Symbol('Createbuyersupport');
