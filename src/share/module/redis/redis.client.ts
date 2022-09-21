import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';

import { ApplicationConfig } from '@config/application.config';
import { AppLogger } from '@config/logger/app-logger.config';

@Injectable()
export class RedisClient {
  private readonly DEFAULT_LOCK_TTL = 10000;
  private readonly DEFAULT_CACHE_TTL = 60;

  private readonly redisClient: Redis;
  private readonly redlock: Redlock;

  constructor(private readonly log: AppLogger) {
    this.redisClient = new Redis({
      host: ApplicationConfig.redis.host,
      port: ApplicationConfig.redis.port,
    });
    this.redlock = new Redlock([this.redisClient], {
      retryCount: 20,
      retryDelay: 500,
      retryJitter: 100,
    });
    this.log.setContext(RedisClient.name);
  }

  async doInLock(lockName: string, runnable: () => Promise<void>): Promise<void> {
    try {
      await this.redlock.using([lockName], this.DEFAULT_LOCK_TTL, async (signal) => {
        const { aborted, error } = signal;
        if (aborted) {
          this.log.error('[ERROR-DoInLock]', error);
          throw error;
        }

        await runnable();

        if (aborted) {
          this.log.error('[ERROR-DoInLock]', error);
          throw error;
        }
      });
    } catch (error) {
      this.log.error('[ERROR-DoInLock]', error);
      throw error;
    }
  }

  async getInLock<T>(lockName: string, supplier: () => Promise<T>): Promise<T> {
    try {
      return this.redlock.using([lockName], this.DEFAULT_LOCK_TTL, async (signal) => {
        const { aborted, error } = signal;
        if (aborted) {
          this.log.error('[ERROR-GetInLock]', error);
          throw error;
        }

        const result = await supplier();

        if (aborted) {
          this.log.error('[ERROR-GetInLock]', error);
          throw error;
        }
        return result;
      });
    } catch (error) {
      this.log.error('[ERROR-GetInLock]', error);
      throw error;
    }
  }

  async getCache<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redisClient.get(key);
      if (data) {
        return JSON.parse(data) as T;
      }
      return null;
    } catch (error) {
      this.log.error('[ERROR-GetCache]', error);
      throw error;
    }
  }

  async setCache(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const valueStr = JSON.stringify(value);
      await this.redisClient.set(key, valueStr, 'EX', ttlSeconds || this.DEFAULT_CACHE_TTL);
    } catch (error) {
      this.log.error('[ERROR-SetCache]', error);
      throw error;
    }
  }

  async delCache(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      this.log.error('[ERROR-DelCache]', error);
      throw error;
    }
  }
}
