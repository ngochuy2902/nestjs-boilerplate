import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppLoggerModule } from '@config/logger/app-logger.module';
import { Role } from '@entity';

import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AppLoggerModule],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
