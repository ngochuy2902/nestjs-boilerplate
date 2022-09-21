import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Role } from '@entity';
import { BaseRepository } from '@share/repository/base.repository';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(
    @InjectRepository(Role)
    repo: Repository<Role>,
  ) {
    super(repo);
  }

  async fetchByUserId(userId: number): Promise<Role[]> {
    return this.repo
      .createQueryBuilder('role')
      .innerJoin('userRoles', 'userRole', 'role.id = userRole.roleId')
      .where('userRole.userId = :userId', { userId })
      .getMany();
  }

  async fetchByNames(names: string[]): Promise<Role[]> {
    return this.findBy({ name: In(names) });
  }
}
