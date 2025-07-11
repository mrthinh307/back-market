import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import { JwtPayload, TokenPair, LoginPhaseResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await argon.hash(password);
  }

  private async signToken(userId: string, email: string): Promise<TokenPair> {
    const payload = { sub: userId, email };

    const accessToken = await this.jwt.signAsync(payload);
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d', // 👈 override default value
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // SIGN UP
  async signup(dto: SignupDto): Promise<TokenPair> {
    const hash = await this.hashPassword(dto.password);

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
        throw new ForbiddenException('Credential taken');
      }
      throw error;
    }
  }

  // LOGIN
  async login(dto: LoginDto): Promise<TokenPair | LoginPhaseResponse> {
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

    return this.signToken(user.id, user.email);
  }

  // REFRESH TOKENS
  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken);

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
      throw new ForbiddenException('Invalid refresh token');
    }
  }
}
