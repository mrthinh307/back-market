import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { OAuthUserInfo, RequestWithCookies } from './auth.types';
import { GoogleOAuthGuard, FacebookOAuthGuard } from './guard';
import { setAuthCookies } from '../common/utils/cookie';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  private redirectToFrontend(res: Response) {
    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    res.redirect(frontendUrl);
  }

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

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.googleLogin(
      req.user as OAuthUserInfo,
    );

    setAuthCookies(res, tokens);

    // Redirect to frontend with success
    this.redirectToFrontend(res);
  }

  @Get('facebook')
  @UseGuards(FacebookOAuthGuard)
  async facebookAuth() {
    // Guard redirects to Facebook
  }

  @Get('facebook/callback')
  @UseGuards(FacebookOAuthGuard)
  async facebookAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.facebookLogin(
      req.user as OAuthUserInfo,
    );

    setAuthCookies(res, tokens);

    // Redirect to frontend with success
    this.redirectToFrontend(res);
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

    setAuthCookies(res, newTokens);

    return { access_token: newTokens.access_token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return res.json({
      message: 'Logged out successfully',
    });
  }
}
