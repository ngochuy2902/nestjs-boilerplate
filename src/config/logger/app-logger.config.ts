import { createLogger, format, Logger, transports } from 'winston';
import { Injectable } from '@nestjs/common';

import { ApplicationConfig } from '../application.config';

@Injectable()
export class AppLogger {
  private logger: Logger;

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
        new transports.File({
          filename: 'server.log',
          level: 'info',
          maxsize: 5242880,
          dirname: ApplicationConfig.loggerDirectory,
          format: combine(
            format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
            timestamp(),
            customFormat,
          ),
        }),
      ],
    });
  }

  info(context: string, message: string, object?: any) {
    const { contextFormat, objectFormat } = this.getFormat(context, object);
    return this.logger.info(`${contextFormat}${message}${objectFormat}`);
  }

  error(context: string, message: string, object?: any) {
    const { contextFormat, objectFormat } = this.getFormat(context, object);
    return this.logger.error(`${contextFormat}${message}${objectFormat}`);
  }

  getFormat(context: string, object: any) {
    const contextFormat = context ? `${context}: ` : '';
    const objectFormat = object ? JSON.stringify(object) : '';
    return { contextFormat, objectFormat };
  }
}
