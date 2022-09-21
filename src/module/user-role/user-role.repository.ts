import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { UserRole } from '@entity/user-role.entity';

@Injectable()
export class UserRoleRepository extends Repository<UserRole> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async saveEntity(userRole: UserRole, transaction?: QueryRunner): Promise<UserRole> {
    if (transaction) {
      return transaction.manager.save(this.create(userRole));
    }
    return this.save(this.create(userRole));
  }
}
