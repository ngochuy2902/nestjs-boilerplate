import { createLogger, format, Logger, transports } from 'winston';
import { applicationConfig } from './application.config';
import { Injectable } from '@nestjs/common';

const { combine, timestamp, printf } = format;

const customFormat = printf(
  ({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`,
);

@Injectable()
export class AppLogger {
  private context?: string;
  private logger: Logger;

  public setContext(context?: string) {
    this.context = context;
  }

  constructor() {
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
        new transports.File({
          filename: 'server.log',
          level: 'info',
          maxsize: 5242880,
          dirname: applicationConfig.loggerDirectory,
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
    return this.logger.error(`${contextFormat}${message}${objectFormat}`);
  }

  getFormat(context: string, object: any) {
    const contextFormat = context ? `${context}: ` : '';
    const objectFormat = object ? JSON.stringify(object) : '';
    return { contextFormat, objectFormat };
  }
}
