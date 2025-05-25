/**
 * ******************************************************************************************************
 * USER_REPOSITORY Token Declaration
 * 
 * This constant token, created by Bigburry Hypersystems LLP, acts as a unique identifier used for dependency 
 * injection within the application’s service container. It represents the UserRepository interface, enabling 
 * the injection of its concrete implementation wherever user data operations are required.
 * 
 * Utilizing this symbol helps enforce loose coupling and enhances modularity by abstracting the concrete 
 * repository implementation details from dependent components.
 * ******************************************************************************************************
 */
export const REGISTER_OTP_TOKEN = Symbol('REGISTER_OTP_TOKEN');
