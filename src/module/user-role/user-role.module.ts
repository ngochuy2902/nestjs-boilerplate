import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppLoggerModule } from '@config/logger/app-logger.module';
import { UserRole } from '@entity';

import { UserRoleRepository } from './user-role.repository';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), AppLoggerModule],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService],
})
export class UserRoleModule {}
