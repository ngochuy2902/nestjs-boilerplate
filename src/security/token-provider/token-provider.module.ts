import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenProvider } from './token-provider';
import { AppLoggerModule } from '@config/logger/app-logger.module';

@Module({
  imports: [AppLoggerModule],
  providers: [TokenProvider, JwtService],
  exports: [TokenProvider],
})
export class TokenProviderModule {}
