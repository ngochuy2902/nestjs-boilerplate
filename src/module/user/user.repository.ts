import { Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';

import { User } from '@entity';
import { Page } from '@share/page/page';
import { PageRequest } from '@share/page/page-request';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async saveEntity(user: Partial<User>): Promise<User> {
    return this.save(this.create(user));
  }

  async getById(id: number): Promise<User> {
    return this.findOneBy({ id });
  }

  async getByUsername(username: string): Promise<User> {
    return this.findOneBy({ username });
  }

  async fetchUsers(keyword: string, pageRequest: PageRequest): Promise<Page<User>> {
    const condition = keyword && [
      { name: Like(`%${keyword}%`) },
      { username: Like(`%${keyword}%`) },
    ];
    const [users, count] = await this.findAndCount({
      where: condition,
      ...pageRequest,
    });
    return Page.of(users, count, pageRequest);
  }
}
