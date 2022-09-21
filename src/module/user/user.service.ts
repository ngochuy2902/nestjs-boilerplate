import { Injectable } from '@nestjs/common';

import { UserRepository } from '@module/user/user.repository';
import { User } from '@entity/user.entity';
import { AppLogger } from '@config/logger/app-logger.config';
import { Page } from '@util/page/page';
import { PageRequest } from '@util/page/page-request';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(UserService.name);
  }

  async save(user: User): Promise<User> {
    this.log.info(`Save user by with data #`, user);

    return this.repository.saveEntity(user);
  }

  async getById(id: number): Promise<User> {
    this.log.info(`Get user by id #${id}`);

    return this.repository.getById(id);
  }

  async getByEmail(email: string): Promise<User> {
    this.log.info(`Get user by email #${email}`);

    return this.repository.getByEmail(email);
  }

  async fetchUsers(keyword: string, pageRequest: PageRequest): Promise<Page<User>> {
    this.log.info(`Fetch users by keyword #${keyword} and pageRequest #`, pageRequest);

    return this.repository.fetchUsers(keyword, pageRequest);
  }
}
