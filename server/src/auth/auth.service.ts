import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import {
  JwtPayload,
  TokenPair,
  LoginPhaseResponse,
  OAuthUserInfo,
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
    user: User,
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
  private async findOrCreateOAuthUser(params: OAuthUserInfo): Promise<User> {
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

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create new OAuth user
      user = await this.prisma.user.create({
        data: {
          email,
          providerId,
          provider,
          emailVerified: emailVerified ?? false,
          avatarUrl,
          firstName: firstName || '',
          lastName: lastName || '',
        },
      });
    } else {
      // Update existing user with OAuth data if missing
      const updateData: Partial<User> = {};

      if (!user.providerId && providerId) updateData.providerId = providerId;
      if (!user.provider && provider) updateData.provider = provider;
      if (!user.emailVerified && emailVerified)
        updateData.emailVerified = emailVerified;
      if (!user.avatarUrl && avatarUrl) updateData.avatarUrl = avatarUrl;

      if (Object.keys(updateData).length > 0) {
        user = await this.prisma.user.update({
          where: { email },
          data: updateData,
        });
      }
    }

    return user;
  }

  // PUBLIC METHODS

  /**
   * Register a new user with email and password
   */
  async signup(dto: SignupDto): Promise<TokenPair> {
    const hashedPassword = await this.hashPassword(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken(user.id, user.email);
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
    const user = await this.prisma.user.findUnique({
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
    return this.signToken(user.id, user.email);
  }

  /**
   * Authenticate user via Facebook OAuth
   */
  async facebookLogin(facebookUser: OAuthUserInfo): Promise<TokenPair> {
    const user = await this.findOrCreateOAuthUser(facebookUser);
    return this.signToken(user.id, user.email);
  }

  /**
   * Generate new access and refresh tokens
   */
  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken);

      const user = await this.prisma.user.findUnique({
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
