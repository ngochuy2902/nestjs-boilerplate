import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { UserRepository } from '@module/user/user.repository';
import { User } from '@entity/user.entity';
import { AppLogger } from '@config/logger/app-logger.config';

@Injectable()
export class UserService {
  private readonly context: string;

  constructor(private readonly repository: UserRepository, private readonly log: AppLogger) {
    this.context = UserService.name;
  }

  async save(user: User, transaction?: QueryRunner): Promise<User> {
    this.log.info(this.context, `Save user by with data #`, user);

    return this.repository.saveEntity(user, transaction);
  }

  async getById(id: number): Promise<User> {
    this.log.info(this.context, `Get user by id #${id}`);

    return this.repository.getById(id);
  }

  async getByEmail(email: string): Promise<User> {
    this.log.info(this.context, `Get user by email #${email}`);

    return this.repository.getByEmail(email);
  }

  async fetchUsers(keyword: string, pageRequest: any): Promise<{ users: User[]; count: number }> {
    this.log.info(
      this.context,
      `Fetch users by keyword #${keyword} and pageRequest #`,
      pageRequest,
    );

    return this.repository.fetchUsers(keyword, pageRequest);
  }
}
