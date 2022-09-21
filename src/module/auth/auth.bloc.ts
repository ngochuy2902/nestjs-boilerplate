import { Injectable } from '@nestjs/common';
import { AppLogger } from '@config/logger/app-logger.config';
import { TokenProvider } from '@security/token-provider/token-provider';
import { RoleService } from '../role/role.service';
import { LoginResDto } from './dto/res/login-res.dto';
import { UnauthorizedException } from '@exception/unauthorized.exception';
import { ValidatorException } from '@exception/validator.exception';
import { ErrorCode } from '@share/constant/error-code';
import { TokenPayload } from '@share/dto/type/token-payload';
import { RefreshTokenResDto } from './dto/res/refresh-token-res.dto';
import { EncryptionUtil } from '@util/encryption.util';
import { UserService } from '@module/user/user.service';

@Injectable()
export class AuthBloc {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly tokenProvider: TokenProvider,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(AuthBloc.name);
  }

  async login(email: string, password: string): Promise<any> {
    this.log.info(`Login by email #${email}`);

    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password!');
    }
    if (!(await EncryptionUtil.verifyHash(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password!');
    }
    const { id: userId } = user;
    const roles = (await this.roleService.fetchByUserId(userId)).map((role) => role.name);
    const { accessToken, refreshToken } = this.tokenProvider.generateToken(userId, roles);
    return { roles, accessToken, refreshToken } as unknown as LoginResDto;
  }

  refreshToken(currentRefreshToken: string): RefreshTokenResDto {
    this.log.info('Refresh token');
    const payload: TokenPayload = this.tokenProvider.verifyToken(currentRefreshToken);
    if (!payload) {
      throw new ValidatorException('Invalid refreshToken', ErrorCode.INVALID_REFRESH_TOKEN);
    }
    const { id, roles: stringRole } = payload;
    const roles = stringRole.split(',');
    const { accessToken, refreshToken } = this.tokenProvider.generateToken(id, roles);
    return { roles, accessToken, refreshToken } as unknown as RefreshTokenResDto;
  }
}
