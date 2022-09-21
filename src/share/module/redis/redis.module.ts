import { Module } from '@nestjs/common';

import { AppLoggerModule } from '@config/logger/app-logger.module';
import { RedisClient } from '@share/module/redis/redis.client';
import { RedisService } from '@share/module/redis/redis.service';

@Module({
  imports: [AppLoggerModule],
  providers: [RedisService, RedisClient],
  exports: [RedisService],
})
export class RedisModule {}
