import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { Role } from '@entity/role.entity';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async fetchByUserId(userId: number): Promise<Role[]> {
    return this.createQueryBuilder('roles')
      .innerJoin('user_roles', 'user_roles', 'roles.id = user_roles.role_id')
      .where('user_roles.user_id = :userId', { userId })
      .getMany();
  }

  async fetchByNames(names: string[]): Promise<Role[]> {
    return this.findBy({ name: In(names) });
  }
}
