import { Injectable, Scope } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { ApplicationConfig } from '../application.config';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private context: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    const { combine, timestamp, printf } = format;
    const customFormat = printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`,
    );

    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: 'info',
          format: combine(
            format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
            format.colorize(),
            timestamp(),
            customFormat,
          ),
        }),
        new DailyRotateFile({
          filename: `${ApplicationConfig.loggerDirectory}/%DATE%`,
          datePattern: 'YYYY-MM-DD',
          level: 'info',
          maxSize: '5m',
          maxFiles: '10d',
          zippedArchive: true,
          format: combine(
            format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
            timestamp(),
            customFormat,
          ),
        }),
      ],
    });
  }

  info(message: string, object?: any) {
    const { contextFormat, objectFormat } = this.getFormat(this.context, object);
    return this.logger.info(`${contextFormat}${message}${objectFormat}`);
  }

  error(message: string, object?: any) {
    const { contextFormat, objectFormat } = this.getFormat(this.context, object);
    return this.logger.error(`${contextFormat}${message || ''}${objectFormat}`);
  }

  getFormat(context: string, object: any) {
    const contextFormat = context ? `${context}: ` : '';
    const objectFormat = object
      ? typeof object == 'string'
        ? object
        : JSON.stringify(object)
      : '';
    return { contextFormat, objectFormat };
  }
}
