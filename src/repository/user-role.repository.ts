import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserRole } from '../entity/user-role.entity';

@Injectable()
export class UserRoleRepository extends Repository<UserRole> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async saveEntity(userRole: UserRole, transactionManager?: EntityManager): Promise<UserRole> {
    if (transactionManager) {
      return transactionManager.save(this.create(userRole));
    }
    return this.save(this.create(userRole));
  }
}
