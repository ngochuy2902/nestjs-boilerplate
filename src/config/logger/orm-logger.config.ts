import { Logger } from 'typeorm';

import { AppLogger } from './app-logger.config';

/* eslint-disable */
export class OrmLogger implements Logger {
  private readonly appLog: AppLogger;
  constructor(appLog: AppLogger) {
    this.appLog = appLog;
  }

  log(level: 'log' | 'info' | 'warn', message: any): any {
    return;
  }

  logMigration(message: string): any {
    return;
  }

  logQuery(query: string, parameters?: any[]): any {
    if (query.includes('SELECT VERSION() AS `version`')) {
      return;
    }
    if (!parameters || !parameters.length) {
      return this.appLog.info(`Query: ${query}`);
    }
    return this.appLog.info(`Query: ${query} - Parameters: `, parameters);
  }

  logQueryError(error: string | Error, query: string): any {
    this.appLog.error(null, `Query: ${query} - Has Error: ${error}`);
  }

  logQuerySlow(time: number, query: string): any {
    return;
  }

  logSchemaBuild(message: string): any {
    return;
  }
}
