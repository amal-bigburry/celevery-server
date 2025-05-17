/**
 * Importing Required Packages
 * Importing the Request type from express to extend for authentication
 */
import { Request } from 'express';
/**
 * Returns an interface of authrequest
 * Extends the express Request interface to include user authentication info
 */
export interface AuthRequest extends Request {
  /**
   * User object containing authenticated user's details
   */
  user: {
    userId: string;
    email: string;
  };
}
