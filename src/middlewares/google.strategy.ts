// src/auth/strategies/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleRegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: configService.get<string>('GOOGLE_AUTH_REDIRECTION_URL_FOR_REGISTER'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      display_name: name.givenName+" "+ name.familyName,
      picture: photos[0].value,
    //   accessToken,
    };
    done(null, user);
  }
}

@Injectable()
export class GoogleLoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: configService.get<string>('GOOGLE_AUTH_REDIRECTION_URL_FOR_LOGIN'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      display_name: name.givenName+" "+ name.familyName,
      picture: photos[0].value,
    //   accessToken,
    };
    done(null, user);
  }
}
