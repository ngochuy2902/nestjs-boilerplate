import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from '@entity/role.entity';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { AppLoggerModule } from '@config/logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AppLoggerModule],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
