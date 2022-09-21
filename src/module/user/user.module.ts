import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserBloc } from './user.bloc';
import { User } from '@entity/user.entity';
import { UserRepository } from './user.repository';
import { AppLoggerModule } from '@config/logger/app-logger.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { RoleModule } from '../role/role.module';
import { MailModule } from '@share/module/mail/mail.module';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    UserRoleModule,
    MailModule,
    AppLoggerModule,
  ],
  providers: [UserBloc, UserService, UserRepository],
  controllers: [UserController],
  exports: [UserBloc, UserService],
})
export class UserModule {}
