import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Transactional } from 'typeorm-transactional';

import { AppLogger } from '@config/logger/app-logger.config';
import { User } from '@entity';
import { NotFoundException } from '@exception/not-found.exception';
import { ValidatorException } from '@exception/validator.exception';
import { ResetPasswordReq } from '@module/user/dto/req/reset-password.req';
import { UserCreateReq } from '@module/user/dto/req/user-create.req';
import { UserRes } from '@module/user/dto/res/user.res';
import { UserService } from '@module/user/user.service';
import { CtxReq } from '@security/request-context/request-context.dto';
import { ErrorCode } from '@share/constant/error-code.constant';
import { Page } from '@share/page/page';
import { PageRequest } from '@share/page/page-request';
import { EncryptionUtil } from '@util/encryption.util';

import { RoleService } from '../role/role.service';
import { UserRoleService } from '../user-role/user-role.service';
import { FetchUserReq } from './dto/req/fetch-user.req';

@Injectable()
export class UserBloc {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly userRoleService: UserRoleService,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(UserBloc.name);
  }

  @Transactional()
  async createUser({ userId: currentUserId }: CtxReq, req: UserCreateReq): Promise<UserRes> {
    const { email, password, name, roles: rolesNames } = req;
    this.log.info(`Create user with email #${email}, name #${name} and roles #${rolesNames}`);
    const existUser = await this.userService.getByEmail(email);
    if (existUser) {
      throw new ValidatorException(
        `User with email #${email} already exists`,
        ErrorCode.USER_ALREADY_EXIST,
      );
    }
    const passwordHash = await EncryptionUtil.generateHash(password);

    const user = await this.userService.save({
      email,
      password: passwordHash,
      name,
      createdBy: currentUserId,
      updatedBy: currentUserId,
    });
    const { id: userId } = user;

    const roles = await this.roleService.fetchByNames(rolesNames);
    for (const role of roles) {
      await this.userRoleService.save({
        userId,
        roleId: role.id,
        createdBy: currentUserId,
        updatedBy: currentUserId,
      });
    }
    return plainToInstance(UserRes, user, {
      excludeExtraneousValues: true,
    });
  }

  async searchUsers(req: FetchUserReq): Promise<Page<User>> {
    this.log.info(`Fetch all users by req #`, req);
    const { keyword } = req;
    const pageRequest = PageRequest.ofRequest(req);
    return this.userService.fetchUsers(keyword, pageRequest);
  }

  async getById(id: number): Promise<User> {
    this.log.info(`Get user by id #${id}`);
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  async getCurrentUserProfile(currentUserId: number): Promise<User> {
    this.log.info(`Get current user profile by currentUserId #${currentUserId}`);
    return this.userService.getById(currentUserId);
  }

  async changePassword(currentUserId: number, currentPassword: string, newPassword: string) {
    this.log.info(`Change password by currentUserId #${currentUserId}`);
    const user = await this.userService.getById(currentUserId);
    if (!(await EncryptionUtil.verifyHash(currentPassword, user.password))) {
      throw new ValidatorException('Invalid currentPassword', ErrorCode.WRONG_PASSWORD);
    }
    const newPasswordHash = await EncryptionUtil.generateHash(newPassword);
    await this.userService.save({
      ...user,
      password: newPasswordHash,
    });
  }

  @Transactional()
  async resetPassword({ userId: currentUserId }: CtxReq, id: number, req: ResetPasswordReq) {
    this.log.info(`Reset password by currentUserId #${currentUserId} and userId #${id}`);
    const user = await this.userService.getById(id);

    if (!user) {
      throw new NotFoundException(`User with id #${id}`);
    }

    const { newPassword } = req;
    const passwordHash = await EncryptionUtil.generateHash(newPassword);
    await this.userService.save({
      ...user,
      password: passwordHash,
      updatedBy: currentUserId,
    });
  }
}
