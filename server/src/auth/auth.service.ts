/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import { JwtPayload, LoginResult, TokenPair } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // SIGN UP
  async signup(dto: SignupDto): Promise<TokenPair> {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
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
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  // LOGIN
  async login(dto: LoginDto): Promise<LoginResult> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Phase 1: Only email is provided
    if (!dto.password) {
      return {
        action: user ? 'login' : 'signup',
        message: user
          ? 'Email found. Forwarding to Login form.'
          : 'Email not found. Forwarding to Signup form.',
      };
    }

    // Phase 2: Email + password provided
    if (!user) {
      throw new ForbiddenException(
        'User not found. Please verify your credentials.',
      );
    }

    const isPasswordValid = await argon.verify(user.hash, dto.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Password incorrect. Please try again.');
    }

    const tokens = await this.signToken(user.id, user.email);

    const { hash: _hash, ...userWithoutPassword } = user;

    return {
      message: 'Login successful',
      user: userWithoutPassword,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  async signToken(userId: string, email: string): Promise<TokenPair> {
    const payload = { sub: userId, email };
    const secret = this.config.getOrThrow<string>('JWT_SECRET');

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  verifyRefreshToken(token: string) {
    return this.jwt.verify(token);
  }

  // REFRESH TOKENS
  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new ForbiddenException('User no longer exists');
      }

      // (Optional) Có thể kiểm tra refresh token có bị revoke hay không

      return await this.signToken(user.id, user.email);
    } catch (error) {
      console.error('Refresh token verification failed:', error);
      throw new ForbiddenException('Invalid refresh token: ');
    }
  }
}
