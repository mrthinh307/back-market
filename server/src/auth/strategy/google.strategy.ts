import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID:
        configService.get<string>('GOOGLE_CLIENT_ID') ||
        (() => {
          throw new Error(
            'GOOGLE_CLIENT_ID is not set in the environment variables',
          );
        })(),
      clientSecret:
        configService.get<string>('GOOGLE_CLIENT_SECRET') ||
        (() => {
          throw new Error(
            'GOOGLE_CLIENT_SECRET is not set in the environment variables',
          );
        })(),
      callbackURL:
        configService.get<string>('GOOGLE_CALLBACK_URL') ||
        (() => {
          throw new Error(
            'GOOGLE_CALLBACK_URL is not set in the environment variables',
          );
        })(),
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string, // Google access_token: Used when integrating with Google APIs
    _refreshToken: string, // Google refresh_token: Used when integrating with Google APIs
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos, provider } = profile;

    const user = {
      email: emails?.[0]?.value,
      emailVerified: emails?.[0]?.verified,
      firstName: name?.givenName,
      lastName: name?.familyName,
      avatarUrl: photos?.[0]?.value,
      provider,
      providerId: id,
    };

    done(null, user);
  }
}
