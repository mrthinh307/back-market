import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response, CookieOptions } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { RequestWithCookies } from './types';

function getCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };
}

function setAuthCookies(
  res: Response,
  tokens: { access_token: string; refresh_token: string },
) {
  res.cookie('refresh_token', tokens.refresh_token, getCookieOptions());
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signup(dto);

    setAuthCookies(res, tokens);

    return {
      access_token: tokens.access_token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    // Check if the result is a token pair => Successful Login
    if (typeof result === 'object' && 'access_token' in result) {
      setAuthCookies(res, result);
      return {
        access_token: result.access_token,
      };
    }

    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: RequestWithCookies,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.['refresh_token'];
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token missing');
    }

    const newTokens = await this.authService.refreshTokens(refreshToken);

    res.cookie('refresh_token', newTokens.refresh_token, getCookieOptions());

    return { access_token: newTokens.access_token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return res.status(HttpStatus.OK).json({
      message: 'Logged out successfully',
    });
  }
}
