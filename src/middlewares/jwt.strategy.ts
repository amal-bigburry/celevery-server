/**
 * Import Required Packages
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
/**
 * Returns an Injectable service file
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWTSECRET'),
    });
  }
  /**
   * Validate the token in protected routes
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
