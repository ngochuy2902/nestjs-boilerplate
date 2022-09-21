import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { Role } from '@entity';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async fetchByUserId(userId: number): Promise<Role[]> {
    return this.createQueryBuilder('role')
      .innerJoin('userRoles', 'userRole', 'role.id = userRole.roleId')
      .where('userRole.userId = :userId', { userId })
      .getMany();
  }

  async fetchByNames(names: string[]): Promise<Role[]> {
    return this.findBy({ name: In(names) });
  }
}
