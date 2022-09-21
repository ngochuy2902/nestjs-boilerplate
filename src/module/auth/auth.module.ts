import { Module } from '@nestjs/common';

import { RoleModule } from '@module/role/role.module';
import { UserModule } from '@module/user/user.module';
import { JwtStrategy } from '@security/strategy/jwt.strategy';
import { TokenProviderModule } from '@security/token-provider/token-provider.module';

import { AuthBloc } from './auth.bloc';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, RoleModule, TokenProviderModule],
  providers: [AuthBloc, JwtStrategy],
  exports: [AuthBloc],
  controllers: [AuthController],
})
export class AuthModule {}
