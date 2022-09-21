import { Injectable } from '@nestjs/common';

import { UserRoleRepository } from './user-role.repository';
import { AppLogger } from '@config/logger/app-logger.config';
import { UserRole } from '@entity/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly repository: UserRoleRepository,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(UserRoleService.name);
  }

  async save(userRole: UserRole): Promise<UserRole> {
    this.log.info('Save userRole with data #', userRole);
    return this.repository.saveEntity(userRole);
  }
}
