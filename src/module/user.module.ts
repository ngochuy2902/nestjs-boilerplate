import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { AppLoggerModule } from './app-logger.module';
import { UserRoleModule } from './user-role.module';
import { RoleModule } from './role.module';
import { TransactionManagerModule } from './transaction-manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    UserRoleModule,
    TransactionManagerModule,
    AppLoggerModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
