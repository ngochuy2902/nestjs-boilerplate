import { Injectable } from '@nestjs/common';

import { UserRole } from '@entity';
import { AppLogger } from '@share/module/logger/app-logger.service';

import { UserRoleRepository } from './user-role.repository';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly repository: UserRoleRepository,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(UserRoleService.name);
  }

  async save(userRole: Partial<UserRole>): Promise<UserRole> {
    this.log.info('Save userRole with data #', userRole);
    return this.repository.save(userRole);
  }
}
