import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AppLoggerModule } from '@config/logger/app-logger.module';
import { JwtStrategy } from '@security/strategy/jwt.strategy';
import { TokenProviderModule } from '@security/token-provider/token-provider.module';

import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { AuthBloc } from './auth.bloc';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, RoleModule, TokenProviderModule, PassportModule, AppLoggerModule],
  providers: [AuthBloc, JwtStrategy],
  exports: [AuthBloc],
  controllers: [AuthController],
})
export class AuthModule {}
