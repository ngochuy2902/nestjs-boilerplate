import { Module } from '@nestjs/common';

import { AppLogger } from './app-logger.config';

@Module({
  imports: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppLoggerModule {}
