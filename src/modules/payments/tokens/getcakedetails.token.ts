/**
 * Defining a symbol constant used as a unique token for retrieving cake details.
 * The `GETCAKEDETAILS` symbol acts as a unique identifier for the operation that fetches details about cakes in the system.
 * This symbol ensures there are no conflicts with other tokens or identifiers, providing a clear reference for the specific use case.
 * The symbol can be used for dependency injection or to represent the logic for fetching cake details.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export const GETCAKEDETAILS = Symbol('GETCAKEDETAILS');  // Unique symbol to identify the get cake details token
