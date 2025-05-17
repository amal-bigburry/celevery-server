/**
 * Import Required Packages
 * Importing necessary decorators and classes for JWT authentication strategy
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
/**
 * Returns an Injectable service file
 * Defines a JWT authentication strategy for validating JWT tokens in requests
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor initializes JWT strategy with options from config service
   * @param configService - Service to access environment variables like JWT secret
   */
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header as Bearer token
      ignoreExpiration: false, // Do not allow expired tokens
      secretOrKey: configService.get<string>('JWTSECRET'), // Secret key for verifying JWT signature
    });
  }
  /**
   * Validate the token in protected routes
   * Called automatically to verify token payload and return user info
   * @param payload - Decoded JWT payload
   * @returns user object containing userId and email
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
