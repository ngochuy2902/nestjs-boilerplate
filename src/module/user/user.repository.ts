import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { User } from '@entity';
import { Page } from '@share/page/page';
import { PageRequest } from '@share/page/page-request';
import { BaseRepository } from '@share/repository/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    repo: Repository<User>,
  ) {
    super(repo);
  }

  async getById(id: number): Promise<User> {
    return this.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<User> {
    return this.findOneBy({ email });
  }

  async fetchUsers(keyword: string, pageRequest: PageRequest): Promise<Page<User>> {
    const condition = keyword && [{ name: Like(`%${keyword}%`) }, { email: Like(`%${keyword}%`) }];
    const [users, count] = await this.repo.findAndCount({
      where: condition,
      ...pageRequest,
    });
    return Page.of(users, count, pageRequest);
  }
}
