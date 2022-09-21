import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { AppLogger } from '../config/app-logger.config';
import { UserFetchReqDto } from '../dto/request/user/user-fetch-req.dto';
import paginationUtil from '../util/pagination.util';
import { UserContext } from '../security/user-context';
import { NotFoundException } from '../exception/not-found.exception';
import { AlreadyExistException } from '../exception/already-exist.exception';
import { RoleService } from './role.service';
import { UserRoleService } from './user-role.service';
import { UserRole } from '../entity/user-role.entity';
import { RoleType } from '../enum/role-type';
import { TransactionManager } from '../database/transaction-manager';
import { ValidatorException } from '../exception/validator.exception';
import { ErrorCode } from '../constant/error-code';
import encryptionUtil from '../util/encryption.util';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly roleService: RoleService,
    private readonly userRoleService: UserRoleService,
    private readonly transactionManager: TransactionManager,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(UserService.name);
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    rolesNames: RoleType[],
  ): Promise<number> {
    this.log.info(`Create user with email #${email}, name #${name} and roles #${rolesNames}`);
    const existUser = await this.repository.getByEmail(email);
    if (existUser) {
      throw new AlreadyExistException(`User with email #${email}`);
    }
    const passwordHash = await encryptionUtil.generateHash(password);

    const transaction = await this.transactionManager.create();
    try {
      const user = await this.repository.saveEntity(
        {
          email,
          password: passwordHash,
          name,
        } as unknown as User,
        transaction.manager,
      );
      const { id: userId } = user;

      const roles = await this.roleService.fetchByNames(rolesNames);
      for (const role of roles) {
        await this.userRoleService.save(
          {
            userId,
            roleId: role.id,
          } as UserRole,
          transaction.manager,
        );
      }
      await this.transactionManager.commit(transaction);
      return userId;
    } catch (error) {
      await this.transactionManager.rollBack(transaction, error);
    }
  }

  async fetchAll(query: UserFetchReqDto): Promise<{ users: User[]; count: number }> {
    this.log.info(`Fetch all users by query #`, query);
    const { keyword } = query;
    const pageRequest = paginationUtil.getPageRequest(query);
    return this.repository.fetchUsers(keyword, pageRequest);
  }

  async getById(id: number): Promise<User> {
    this.log.info(`Get user by id #${id}`);
    const user = await this.repository.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id}`);
    }
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    this.log.info(`Get user by email #${email}`);
    return this.repository.getByEmail(email);
  }

  async getCurrentUserProfile() {
    const currentUserId = UserContext.currentUserId;
    this.log.info(`Get current user profile by currentUserId #${currentUserId}`);
    return this.repository.getById(currentUserId);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const currentUserId = UserContext.currentUserId;
    this.log.info(`Change password by currentUserId #${currentUserId}`);
    const user = await this.repository.getById(currentUserId);
    if (!(await encryptionUtil.verifyHash(currentPassword, user.password))) {
      throw new ValidatorException('Invalid currentPassword', ErrorCode.WRONG_PASSWORD);
    }
    const newPasswordHash = await encryptionUtil.generateHash(newPassword);
    await this.repository.saveEntity({
      ...user,
      password: newPasswordHash,
    } as User);
  }
}
