import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginReqDto } from '../dto/request/auth/login-req.dto';
import { LoginResDto } from '../dto/response/auth/login-res.dto';
import { AuthService } from '../service/auth.service';
import { RefreshTokenResDto } from '../dto/response/auth/refresh-token-res.dto';
import { RefreshTokenReqDto } from '../dto/request/auth/refresh-token-req.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResDto,
  })
  async login(@Body() loginReq: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReq.email, loginReq.password);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RefreshTokenResDto,
  })
  async refreshToken(@Body() refreshTokenReq: RefreshTokenReqDto): Promise<RefreshTokenResDto> {
    return this.authService.refreshToken(refreshTokenReq.refreshToken);
  }
}
