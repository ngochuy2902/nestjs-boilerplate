import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthBloc } from './auth.bloc';
import { LoginReqDto } from './dto/req/login-req.dto';
import { RefreshTokenReqDto } from './dto/req/refresh-token-req.dto';
import { LoginResDto } from './dto/res/login-res.dto';
import { RefreshTokenResDto } from './dto/res/refresh-token-res.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authBloc: AuthBloc) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ type: LoginResDto })
  async login(@Body() loginReq: LoginReqDto): Promise<LoginResDto> {
    return this.authBloc.login(loginReq.email, loginReq.password);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiOkResponse({ type: RefreshTokenResDto })
  async refreshToken(@Body() refreshTokenReq: RefreshTokenReqDto): Promise<RefreshTokenResDto> {
    return this.authBloc.refreshToken(refreshTokenReq.refreshToken);
  }
}
