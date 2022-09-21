import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthBloc } from './auth.bloc';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TokenProviderModule } from '@security/token-provider/token-provider.module';
import { AppLoggerModule } from '@config/logger/app-logger.module';
import { JwtStrategy } from '@security/strategy/jwt.strategy';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [UserModule, RoleModule, TokenProviderModule, PassportModule, AppLoggerModule],
  providers: [AuthBloc, JwtStrategy],
  exports: [AuthBloc],
  controllers: [AuthController],
})
export class AuthModule {}
