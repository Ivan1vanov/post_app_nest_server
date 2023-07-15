import { Body, Controller, Post, Req, Res, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthUserResponse } from './dto';
import { AuthService } from './auth.service';
import { authRoutes, cookiesSettings } from './constants';
import { UserSignUpDto, UserSignInDto } from './dto/auth.dto';

@Controller(authRoutes.base)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post(authRoutes.signUp)
  async signUpUser(
    @Body() dto: UserSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthUserResponse> {
    const result = await this.authService.signUpUser(dto);
    response.cookie('refreshToken', result.tokens.refreshToken, cookiesSettings);
    return result;
  }

  @UsePipes(new ValidationPipe())
  @Post(authRoutes.login)
  async signInUser(
    @Body() dto: UserSignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthUserResponse> {
    const result = await this.authService.signInUser(dto);
    response.cookie('refreshToken', result.tokens.refreshToken, cookiesSettings);
    return result;
  }

  @UsePipes(new ValidationPipe())
  @Get(authRoutes.refreshToken)
  async getNewTokens(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refreshToken(request.cookies.refreshToken);
    response.cookie('refreshToken', tokens.refreshToken, cookiesSettings);
    return tokens;
  }
}
