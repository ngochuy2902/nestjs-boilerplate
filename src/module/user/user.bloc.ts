import { Injectable } from '@nestjs/common';

import { User } from '@entity/user.entity';
import { AppLogger } from '@config/logger/app-logger.config';
import { UserFetchReqDto } from './dto/req/user-fetch-req.dto';
import { UserContext } from '@security/user-context';
import { NotFoundException } from '@exception/not-found.exception';
import { AlreadyExistException } from '@exception/already-exist.exception';
import { RoleService } from '../role/role.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserRole } from '@entity/user-role.entity';
import { RoleType } from './dto/enum/role-type';
import { TransactionManager } from '@util/transaction-manager/transaction-manager';
import { ValidatorException } from '@exception/validator.exception';
import { ErrorCode } from '@share/constant/error-code';
import { MailService } from '@share/module/mail/mail.service';
import { PaginationUtil } from '@util/pagination.util';
import { EncryptionUtil } from '@util/encryption.util';
import { UserService } from '@module/user/user.service';
import { UserCreateReqDto } from '@module/user/dto/req/user-create-req.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserBloc {
  private readonly context: string;

  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly userRoleService: UserRoleService,
    private readonly transactionManager: TransactionManager,
    private readonly mailService: MailService,
    private readonly log: AppLogger,
  ) {
    this.context = UserBloc.name;
  }

  async createUser(userCreateReq: UserCreateReqDto): Promise<number> {
    const { email, password, name, roles: rolesNames } = userCreateReq;
    this.log.info(
      this.context,
      `Create user with email #${email}, name #${name} and roles #${rolesNames}`,
    );
    const existUser = await this.userService.getByEmail(email);
    if (existUser) {
      throw new AlreadyExistException(this.context, `User with email #${email}`);
    }
    const passwordHash = await EncryptionUtil.generateHash(password);
    const userReq: User = plainToInstance(User, userCreateReq);
    userReq.password = passwordHash;

    const transaction = await this.transactionManager.create();
    try {
      const user = await this.userService.save(userReq, transaction);
      const { id: userId } = user;

      const roles = await this.roleService.fetchByNames(rolesNames);
      for (const role of roles) {
        await this.userRoleService.save(
          {
            userId,
            roleId: role.id,
          } as UserRole,
          transaction,
        );
      }
      await this.transactionManager.commit(transaction);
      this.mailService.sendUserInfo(email, password).then((r) => r);
      return userId;
    } catch (error) {
      await this.transactionManager.rollBack(transaction, error);
    }
  }

  async fetchAll(query: UserFetchReqDto): Promise<{ users: User[]; count: number }> {
    this.log.info(this.context, `Fetch all users by query #`, query);
    const { keyword } = query;
    const pageRequest = PaginationUtil.getPageRequest(query);
    return this.userService.fetchUsers(keyword, pageRequest);
  }

  async getById(id: number): Promise<User> {
    this.log.info(this.context, `Get user by id #${id}`);
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(this.context, `User with id #${id}`);
    }
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    this.log.info(this.context, `Get user by email #${email}`);
    return this.userService.getByEmail(email);
  }

  async getCurrentUserProfile() {
    const currentUserId = UserContext.currentUserId;
    this.log.info(this.context, `Get current user profile by currentUserId #${currentUserId}`);
    return this.userService.getById(currentUserId);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const currentUserId = UserContext.currentUserId;
    this.log.info(this.context, `Change password by currentUserId #${currentUserId}`);
    const user = await this.userService.getById(currentUserId);
    if (!(await EncryptionUtil.verifyHash(currentPassword, user.password))) {
      throw new ValidatorException('Invalid currentPassword', ErrorCode.WRONG_PASSWORD);
    }
    const newPasswordHash = await EncryptionUtil.generateHash(newPassword);
    await this.userService.save({
      ...user,
      password: newPasswordHash,
    } as User);
  }
}
