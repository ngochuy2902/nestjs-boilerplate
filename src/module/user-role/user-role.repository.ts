import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserRole } from '@entity';

@Injectable()
export class UserRoleRepository extends Repository<UserRole> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async saveEntity(userRole: Partial<UserRole>): Promise<UserRole> {
    return this.save(this.create(userRole));
  }
}
