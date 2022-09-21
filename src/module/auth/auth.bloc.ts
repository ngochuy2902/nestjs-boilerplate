import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { AppLogger } from '@config/logger/app-logger.config';
import { UnauthorizedException } from '@exception/unauthorized.exception';
import { ValidatorException } from '@exception/validator.exception';
import { ForceChangePasswordReq } from '@module/auth/dto/req/force-change-password.req';
import { UserService } from '@module/user/user.service';
import { TokenProvider } from '@security/token-provider/token-provider';
import { ErrorCode } from '@share/constant/error-code.constant';
import { TokenPayload } from '@share/dto/type/token-payload';
import { EncryptionUtil } from '@util/encryption.util';

import { RoleService } from '../role/role.service';
import { LoginResDto } from './dto/res/login-res.dto';
import { RefreshTokenResDto } from './dto/res/refresh-token-res.dto';

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

  async login(email: string, password: string): Promise<LoginResDto> {
    this.log.info(`Login by email #${email}`);

    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password!');
    }
    if (!(await EncryptionUtil.verifyHash(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password!');
    }
    const { id: userId, activated } = user;

    if (!activated) {
      throw new UnauthorizedException('User is not activated');
    }

    const roles = (await this.roleService.fetchByUserId(userId)).map((role) => role.name);
    const { accessToken, refreshToken } = this.tokenProvider.generateToken(userId, roles);
    return { accessToken, refreshToken };
  }

  async refreshToken(currentRefreshToken: string): Promise<RefreshTokenResDto> {
    this.log.info('Refresh token');
    const payload: TokenPayload = this.tokenProvider.verifyToken(currentRefreshToken);
    if (!payload) {
      throw new ValidatorException('Invalid refreshToken', ErrorCode.INVALID_REFRESH_TOKEN);
    }
    const { id: userId } = payload;
    const user = await this.userService.getById(userId);
    const { activated } = user;

    if (!activated) {
      throw new UnauthorizedException('User is not activated');
    }

    const roles = (await this.roleService.fetchByUserId(userId)).map((role) => role.name);

    const { accessToken, refreshToken } = this.tokenProvider.generateToken(userId, roles);
    return { accessToken, refreshToken };
  }

  @Transactional()
  async forceChangePassword(req: ForceChangePasswordReq) {
    const { email, password, newPassword } = req;
    this.log.info(`Force change password for email #${email}`);

    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password!');
    }

    const { id: currentUserId, password: currentPassword } = user;

    if (!(await EncryptionUtil.verifyHash(password, currentPassword))) {
      throw new ValidatorException('Invalid currentPassword', ErrorCode.WRONG_PASSWORD);
    }

    if (await EncryptionUtil.verifyHash(newPassword, currentPassword)) {
      throw new ValidatorException(
        'New password must be different from the current password',
        ErrorCode.NEW_PASSWORD_SAME_AS_CURRENT_PASSWORD,
      );
    }

    const passwordHash = await EncryptionUtil.generateHash(newPassword);
    await this.userService.save({
      ...user,
      password: passwordHash,
      updatedBy: currentUserId,
    });
  }
}
