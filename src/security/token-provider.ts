import { applicationConfig } from '../config/application.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from '../dto/type/token-payload';

@Injectable()
export class TokenProvider {
  private readonly tokenSecretKey = applicationConfig.tokenSecretKey;
  private readonly accessTokenExpired = applicationConfig.accessTokenExpired;
  private readonly refreshTokenExpired = applicationConfig.refreshTokenExpired;

  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: number, roles: string[]): { accessToken: string; refreshToken: string } {
    const stringRoles = roles.join(',');
    const payload: TokenPayload = { id: userId, roles: stringRoles };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.tokenSecretKey,
      expiresIn: this.accessTokenExpired,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.tokenSecretKey,
      expiresIn: this.refreshTokenExpired,
    });

    return { accessToken, refreshToken };
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify(token, { secret: this.tokenSecretKey });
  }
}
