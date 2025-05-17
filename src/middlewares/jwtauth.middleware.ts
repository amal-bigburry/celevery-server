/**
 * Importing Required Packages
 * Importing necessary decorators and classes for authentication guard
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * Return an injectable class
 * Defines a JWT authentication guard to protect routes using passport-jwt strategy
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
