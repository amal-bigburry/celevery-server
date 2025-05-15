/**
 * Importing Required Packages
 */
import { Request } from 'express';
/**
 * Returns an interface of authrequest
 */
export interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}
