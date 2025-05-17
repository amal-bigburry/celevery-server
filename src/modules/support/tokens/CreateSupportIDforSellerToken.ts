/**
 * Company: Bigburry Hypersystems LLP
 * 
 * This file exports a unique Symbol serving as an injection token for creating
 * seller support instances within the application. This token is used by the
 * dependency injection system to uniquely identify and provide the correct
 * seller support implementation.
 */
export const CREATE_SELLER_TOKEN = Symbol('Createsellersupport');
