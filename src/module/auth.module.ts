import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { UserModule } from './user.module';
import { TokenProviderModule } from './token-provider.module';
import { AppLoggerModule } from './app-logger.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../security/strategy/jwt.strategy';
import { RoleModule } from './role.module';

@Module({
  imports: [UserModule, RoleModule, TokenProviderModule, PassportModule, AppLoggerModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
