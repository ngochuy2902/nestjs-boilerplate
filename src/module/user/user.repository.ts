import { DataSource, Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from '@entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async saveEntity(user: User): Promise<User> {
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
