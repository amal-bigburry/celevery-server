/**
 * Defining a symbol constant used as a unique token for retrieving user details.
 * The `GETUSERDETAILS` symbol serves as a unique identifier for the operation that fetches specific user information.
 * This symbol ensures that there are no conflicts with other tokens or identifiers, offering a distinct reference for user-related operations.
 * The symbol can be utilized for dependency injection or to identify the logic that retrieves user details in the system.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export const GETUSERDETAILS = Symbol('GETUSERDETAILS');  // Unique symbol to identify the get user details token
