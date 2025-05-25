/**
 * Defining a symbol constant used as a unique token for changing the order status.
 * The `CHANGEORDERSTATUS` symbol is utilized to uniquely identify the token used for order status change operations.
 * This symbol ensures that there is no collision with other tokens or identifiers in the system.
 * It serves as an abstraction layer, providing a unique reference that can be used for dependency injection or identifying
 * a specific use case in the application.
 * 
 * Company: BigBurry Hypersystems LLP
 */
export const CHANGEORDERSTATUS = Symbol('CHANGEORDERSTATUS');  // Unique symbol to identify the change order status token
