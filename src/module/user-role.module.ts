import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLoggerModule } from './app-logger.module';
import { UserRole } from '../entity/user-role.entity';
import { UserRoleService } from '../service/user-role.service';
import { UserRoleRepository } from '../repository/user-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), AppLoggerModule],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService],
})
export class UserRoleModule {}
