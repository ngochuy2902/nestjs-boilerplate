import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { AppLogger } from '../config/app-logger.config';
import { TokenProvider } from '../security/token-provider';
import { RoleService } from './role.service';
import { LoginResDto } from '../dto/response/auth/login-res.dto';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { ValidatorException } from '../exception/validator.exception';
import { ErrorCode } from '../constant/error-code';
import TokenPayload from '../dto/type/token-payload';
import { RefreshTokenResDto } from '../dto/response/auth/refresh-token-res.dto';
import encryptionUtil from '../util/encryption.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly tokenProvider: TokenProvider,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(AuthService.name);
  }

  async login(email: string, password: string): Promise<any> {
    this.log.info(`Login by email #${email}`);

    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password!');
    }
    if (!(await encryptionUtil.verifyHash(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password!');
    }
    const { id: userId } = user;
    const roles = (await this.roleService.fetchByUserId(userId)).map((role) => role.name);
    const { accessToken, refreshToken } = this.tokenProvider.generateToken(userId, roles);
    return { roles, accessToken, refreshToken } as unknown as LoginResDto;
  }

  refreshToken(refreshToken: string): RefreshTokenResDto {
    this.log.info('Refresh token');
    const payload: TokenPayload = this.tokenProvider.verifyToken(refreshToken);
    if (!payload) {
      throw new ValidatorException('Invalid refreshToken', ErrorCode.INVALID_REFRESH_TOKEN);
    }
    const { id, roles: stringRole } = payload;
    const roles = stringRole.split(',');
    return this.tokenProvider.generateToken(id, roles);
  }
}
