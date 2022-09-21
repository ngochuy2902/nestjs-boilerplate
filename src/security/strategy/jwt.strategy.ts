import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { applicationConfig } from '../../config/application.config';
import TokenPayload from '../../dto/type/token-payload';
import { UserContext } from '../user-context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: applicationConfig.tokenSecretKey,
    });
  }

  async validate(payload: TokenPayload) {
    UserContext.currentUserId = payload.id;
    return { userId: payload.id, roles: payload.roles };
  }
}
