import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenProvider } from './token-provider';

@Module({
  providers: [TokenProvider, JwtService],
  exports: [TokenProvider],
})
export class TokenProviderModule {}
