import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserAuth, UserProfile } from '@prisma/client';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import {
  JwtPayload,
  TokenPair,
  LoginPhaseResponse,
  OAuthUserInfo,
  User,
} from './auth.types';

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_EXPIRY = '15m';
  private readonly REFRESH_TOKEN_EXPIRY = '7d';

  private readonly ERROR_MESSAGES = {
    CREDENTIAL_TAKEN: 'Email already exists',
    USER_NOT_FOUND: 'Invalid email or password',
    INVALID_PASSWORD: 'Invalid email or password',
    USER_NO_LONGER_EXISTS: 'User account no longer exists',
    INVALID_REFRESH_TOKEN: 'Invalid or expired refresh token',
    MISSING_EMAIL: 'Email is required',
  } as const;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Hash password using Argon2
   */
  private async hashPassword(password: string): Promise<string> {
    return argon.hash(password);
  }

  /**
   * Verify password against hash
   */
  private async verifyPassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return argon.verify(hash, password);
  }

  /**
   * Generate JWT access and refresh tokens
   */
  private async signToken(userId: string, email: string): Promise<TokenPair> {
    const payload: JwtPayload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: this.ACCESS_TOKEN_EXPIRY }),
      this.jwt.signAsync(payload, { expiresIn: this.REFRESH_TOKEN_EXPIRY }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   * Validate user password
   */
  private async validateUserPassword(
    user: UserAuth,
    password: string,
  ): Promise<void> {
    if (!user.hash) {
      throw new ForbiddenException(this.ERROR_MESSAGES.INVALID_PASSWORD);
    }

    const isPasswordValid = await this.verifyPassword(user.hash, password);
    if (!isPasswordValid) {
      throw new ForbiddenException(this.ERROR_MESSAGES.INVALID_PASSWORD);
    }
  }

  /**
   * Find or create OAuth user with profile data
   */
  private async findOrCreateOAuthUser(
    params: OAuthUserInfo,
  ): Promise<User | UserAuth> {
    const {
      email,
      providerId,
      provider,
      emailVerified,
      avatarUrl,
      firstName,
      lastName,
    } = params;

    if (!email) {
      throw new ForbiddenException(this.ERROR_MESSAGES.MISSING_EMAIL);
    }

    // Try to find existing user by email
    const user = await this.prisma.userAuth.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      // Create new OAuth user with profile using transaction
      const userData = await this.prisma.$transaction(async (tx) => {
        const newUserAuth = await tx.userAuth.create({
          data: {
            email,
            emailVerified: emailVerified ?? false,
            provider,
            providerId,
          },
        });

        await tx.userProfile.create({
          data: {
            authId: newUserAuth.id,
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            avatarUrl: avatarUrl ?? '',
          },
        });

        return newUserAuth;
      });

      return userData;
    } else {
      // Update existing user with OAuth data if missing
      const updateUserAuthData: Partial<UserAuth> = {};
      const updateUserProfileData: Partial<UserProfile> = {};

      // Update auth data if missing
      if (!user.providerId && providerId)
        updateUserAuthData.providerId = providerId;
      if (!user.provider && provider) updateUserAuthData.provider = provider;
      if (!user.emailVerified && emailVerified)
        updateUserAuthData.emailVerified = emailVerified;

      // Perform updates in transaction if needed
      if (
        Object.keys(updateUserAuthData).length > 0 ||
        Object.keys(updateUserProfileData).length > 0
      ) {
        return await this.prisma.$transaction(async (tx) => {
          // Update or create profile if needed
          if (user.profile && Object.keys(updateUserProfileData).length > 0) {
            await tx.userProfile.update({
              where: { id: user.profile.id },
              data: updateUserProfileData,
            });
          }

          // Update auth data if needed
          if (Object.keys(updateUserAuthData).length > 0) {
            return await tx.userAuth.update({
              where: { id: user.id },
              data: updateUserAuthData,
            });
          }

          return user;
        });
      }

      return user;
    }
  }

  // PUBLIC METHODS

  /**
   * Register a new user with email and password
   */
  async signup(dto: SignupDto): Promise<TokenPair> {
    const hashedPassword = await this.hashPassword(dto.password);

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const userAuth = await tx.userAuth.create({
          data: {
            email: dto.email,
            hash: hashedPassword,
          },
        });

        await tx.userProfile.create({
          data: {
            authId: userAuth.id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${dto.firstName}%20${dto.lastName}`,
          },
        });

        return userAuth;
      });

      return this.signToken(result.id, result.email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException(this.ERROR_MESSAGES.CREDENTIAL_TAKEN);
      }
      throw error;
    }
  }

  /**
   * Login user with email/password or email verification
   */
  async login(dto: LoginDto): Promise<TokenPair | LoginPhaseResponse> {
    const user = await this.prisma.userAuth.findUnique({
      where: { email: dto.email },
    });

    // Phase 1: Email verification only
    if (!dto.password) {
      return {
        action: user ? 'login' : 'signup',
        message: user
          ? 'Email found. Forwarding to Login form.'
          : 'Email not found. Forwarding to Signup form.',
      };
    }

    // Phase 2: Full authentication
    if (!user) {
      throw new ForbiddenException(this.ERROR_MESSAGES.USER_NOT_FOUND);
    }

    await this.validateUserPassword(user, dto.password);
    return this.signToken(user.id, user.email);
  }

  /**
   * Authenticate user via Google OAuth
   */
  async googleLogin(googleUser: OAuthUserInfo): Promise<TokenPair> {
    const user = await this.findOrCreateOAuthUser(googleUser);

    if (!user) {
      throw new ForbiddenException(this.ERROR_MESSAGES.USER_NO_LONGER_EXISTS);
    }

    return this.signToken(user.id, user.email);
  }

  /**
   * Authenticate user via Facebook OAuth
   */
  async facebookLogin(facebookUser: OAuthUserInfo): Promise<TokenPair> {
    const user = await this.findOrCreateOAuthUser(facebookUser);

    if (!user) {
      throw new ForbiddenException(this.ERROR_MESSAGES.USER_NO_LONGER_EXISTS);
    }

    return this.signToken(user.id, user.email);
  }

  /**
   * Generate new access and refresh tokens
   */
  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken);

      const user = await this.prisma.userAuth.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new ForbiddenException(this.ERROR_MESSAGES.USER_NO_LONGER_EXISTS);
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new ForbiddenException(this.ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
    }
  }
}
