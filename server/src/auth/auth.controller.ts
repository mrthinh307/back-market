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
import { LoginResult, LoginSuccessResponse, RequestWithCookies } from './types';

function isLoginSuccessResponse(
  result: LoginResult,
): result is LoginSuccessResponse {
  return 'access_token' in result;
}

function getCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    if (isLoginSuccessResponse(result)) {
      res.cookie('refresh_token', result.refresh_token, getCookieOptions());
      res.cookie('access_token', result.access_token, getCookieOptions());

      return {
        message: result.message,
        user: result.user,
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
    res.cookie('access_token', newTokens.access_token, getCookieOptions());

    return { message: 'Tokens refreshed' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }
}
