/**
 * Defining a symbol constant used as a unique token for retrieving order details.
 * The `GETORDERDETAILS` symbol acts as a unique identifier for the operation that fetches the details of a specific order.
 * By using this symbol, the system ensures that there are no conflicts with other tokens or identifiers, providing a reliable reference.
 * This symbol can be employed for dependency injection or as a marker to identify the specific use case related to order details.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export const GETORDERDETAILS = Symbol('GETORDERDETAILS');  // Unique symbol to identify the get order details token
