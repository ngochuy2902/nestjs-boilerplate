import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../repository/user-role.repository';
import { AppLogger } from '../config/app-logger.config';
import { UserRole } from '../entity/user-role.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(private readonly repository: UserRoleRepository, private readonly log: AppLogger) {
    this.log.setContext(UserRoleService.name);
  }

  async save(userRole: UserRole, transactionManager?: EntityManager): Promise<UserRole> {
    this.log.info('Save userRole with data #', userRole);
    return this.repository.saveEntity(userRole, transactionManager);
  }
}
