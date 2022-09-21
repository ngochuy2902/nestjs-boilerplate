import { Logger } from 'typeorm';

import { ApplicationConfig } from '@config/application.config';
import { AppLogger } from '@share/module/logger/app-logger.service';

export class OrmLogger implements Logger {
  private readonly appLogger: AppLogger;
  constructor(appLog: AppLogger) {
    this.appLogger = appLog;
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
    const excludedQueries = ['START TRANSACTION', 'COMMIT', 'SELECT VERSION() AS `version`'];
    if (excludedQueries.some((excludedQuery) => query.startsWith(excludedQuery))) {
      return;
    }

    if (!parameters || !parameters.length) {
      return this.appLogger.info(`Query: ${query}`);
    }
    return this.appLogger.info(`Query: ${query} - Parameters: `, parameters);
  }

  logQueryError(error: string | Error, query: string): any {
    this.appLogger.error(null, `Query: ${query} - Has Error: ${error}`);
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
