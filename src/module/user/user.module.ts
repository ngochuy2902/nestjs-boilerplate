import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@entity';
import { RoleModule } from '@module/role/role.module';
import { UserRoleModule } from '@module/user-role/user-role.module';
import { MailModule } from '@share/module/mail/mail.module';

import { UserBloc } from './user.bloc';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, UserRoleModule, MailModule],
  providers: [UserBloc, UserService, UserRepository],
  controllers: [UserController],
  exports: [UserBloc, UserService],
})
export class UserModule {}
