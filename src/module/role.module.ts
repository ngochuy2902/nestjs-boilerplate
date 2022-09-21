import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entity/role.entity';
import { RoleService } from '../service/role.service';
import { RoleRepository } from '../repository/role.repository';
import { AppLoggerModule } from './app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AppLoggerModule],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
