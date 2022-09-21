import { DataSource, EntityManager, Like, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async saveEntity(user: User, transactionManager?: EntityManager): Promise<User> {
    if (transactionManager) {
      return transactionManager.save(this.create(user));
    }
    return this.save(this.create(user));
  }

  async getById(id: number): Promise<User> {
    return this.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<User> {
    return this.findOneBy({ email });
  }

  async fetchUsers(keyword: string, pageRequest: any): Promise<{ users: User[]; count: number }> {
    const condition = keyword && [{ name: Like(`%${keyword}%`) }, { email: Like(`%${keyword}%`) }];
    const [users, count] = await this.findAndCount({
      where: condition,
      ...pageRequest,
    });
    return { users, count };
  }
}
