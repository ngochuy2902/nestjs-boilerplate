import { Injectable } from '@nestjs/common';

import { AppLogger } from '@config/logger/app-logger.config';
import { RedisClient } from '@share/module/redis/redis.client';

@Injectable()
export class RedisService {
  constructor(
    private readonly redisClient: RedisClient,
    private readonly log: AppLogger,
  ) {
    this.log.setContext(RedisService.name);
  }

  async doInLock(lockName: string, fn: () => Promise<void>): Promise<void> {
    this.log.info(`[DoInLock] Start lockName: ${lockName}`);
    await this.redisClient.doInLock(lockName, fn);
    this.log.info(`[DoInLock] End lockName: ${lockName}`);
  }

  async getInLock<T>(lockName: string, fn: () => Promise<T>): Promise<T> {
    this.log.info(`[GetInLock] Start lockName: ${lockName}`);
    const data = await this.redisClient.getInLock(lockName, fn);
    this.log.info(`[GetInLock] End lockName: ${lockName}`);
    return data;
  }

  async getCache(key: string): Promise<string> {
    return this.redisClient.getCache(key);
  }

  async setCache(key: string, value: string, ttlSeconds?: number): Promise<void> {
    return this.redisClient.setCache(key, value, ttlSeconds);
  }

  async delCache(key: string): Promise<void> {
    return this.redisClient.delCache(key);
  }
}
