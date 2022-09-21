import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRole } from '@entity';
import { BaseRepository } from '@share/repository/base.repository';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor(
    @InjectRepository(UserRole)
    repo: Repository<UserRole>,
  ) {
    super(repo);
  }
}
