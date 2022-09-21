import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ApplicationConfig } from '@config/application.config';
import { TokenPayload } from '@share/dto/type/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const token = req.headers[ApplicationConfig.auth.authHeader];
        if (!token) {
          return null;
        }

        return token;
      },
      ignoreExpiration: false,
      secretOrKey: ApplicationConfig.auth.tokenSecretKey,
    });
  }

  async validate(payload: TokenPayload) {
    return { userId: payload.id, roles: payload.roles };
  }
}
