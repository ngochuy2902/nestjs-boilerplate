import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserRole } from '@entity/user-role.entity';

@Injectable()
export class UserRoleRepository extends Repository<UserRole> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async saveEntity(userRole: UserRole): Promise<UserRole> {
    return this.save(this.create(userRole));
  }
}
