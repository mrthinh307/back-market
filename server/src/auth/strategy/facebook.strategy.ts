import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_CLIENT_ID')!,
      clientSecret: configService.get('FACEBOOK_CLIENT_SECRET')!,
      callbackURL: configService.get('FACEBOOK_CALLBACK_URL')!,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  validate(
    _accessToken: string, // Facebook access_token: Used when integrating with Facebook APIs
    _refreshToken: string, // Facebook refresh_token: Used when integrating with Facebook APIs
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    const { id, name, emails, photos, provider } = profile;

    const user = {
      email: emails?.[0]?.value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      avatarUrl: photos?.[0]?.value,
      provider,
      providerId: id,
    };

    done(null, user);
  }
}
