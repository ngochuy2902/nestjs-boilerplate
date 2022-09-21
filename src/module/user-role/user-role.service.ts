import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { UserRoleRepository } from './user-role.repository';
import { AppLogger } from '@config/logger/app-logger.config';
import { UserRole } from '@entity/user-role.entity';

@Injectable()
export class UserRoleService {
  private readonly context: string;

  constructor(private readonly repository: UserRoleRepository, private readonly log: AppLogger) {
    this.context = UserRoleService.name;
  }

  async save(userRole: UserRole, transaction?: QueryRunner): Promise<UserRole> {
    this.log.info(this.context, 'Save userRole with data #', userRole);
    return this.repository.saveEntity(userRole, transaction);
  }
}
