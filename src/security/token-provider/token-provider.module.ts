import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppLoggerModule } from '@config/logger/app-logger.module';

import { TokenProvider } from './token-provider';

@Module({
  imports: [AppLoggerModule],
  providers: [TokenProvider, JwtService],
  exports: [TokenProvider],
})
export class TokenProviderModule {}
