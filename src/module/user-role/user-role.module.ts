import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRole } from '@entity';

import { UserRoleRepository } from './user-role.repository';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService],
})
export class UserRoleModule {}
