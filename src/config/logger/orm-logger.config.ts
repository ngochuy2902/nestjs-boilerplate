import { Logger } from 'typeorm';

import { ApplicationConfig } from '@config/application.config';

import { AppLogger } from './app-logger.config';

export class OrmLogger implements Logger {
  private readonly appLog: AppLogger;
  constructor(appLog: AppLogger) {
    this.appLog = appLog;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  log(level: 'log' | 'info' | 'warn', message: any): any {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logMigration(message: string): any {
    return;
  }

  logQuery(query: string, parameters?: any[]): any {
    if (!ApplicationConfig.logQueryEnabled) {
      return;
    }
    if (
      query.includes('START TRANSACTION') ||
      query.includes('COMMIT') ||
      query.includes('SELECT VERSION() AS `version`')
    ) {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logQuerySlow(time: number, query: string): any {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logSchemaBuild(message: string): any {
    return;
  }
}
