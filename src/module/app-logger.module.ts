import { Module } from '@nestjs/common';
import { AppLogger } from '../config/app-logger.config';

@Module({
  imports: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppLoggerModule {}
