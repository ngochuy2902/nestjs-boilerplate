import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { BaseException } from '@exception/base.exception';
import { AppLogger } from '@config/logger/app-logger.config';
import { ErrorCode } from '@share/constant/error-code';

@Catch()
export class ExceptionsFilter<T> implements ExceptionFilter {
  constructor(private readonly log: AppLogger) {}

  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();

    let statusCode: HttpStatus;
    let name: string;
    let message: string;
    let errorCode: string;

    if (exception instanceof Error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
      name = exception.constructor.name;
      message = exception.message;
    }

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
    }

    if (exception instanceof BaseException) {
      errorCode = exception.errorCode;
    } else if (exception instanceof ForbiddenException) {
      errorCode = ErrorCode.FORBIDDEN;
    } else if (exception instanceof UnauthorizedException) {
      errorCode = ErrorCode.UNAUTHORIZED;
    } else if (exception instanceof BadRequestException) {
      errorCode = ErrorCode.BAD_REQUEST;
      // @ts-ignore
      message = exception.getResponse()?.message.join(', ');
    }

    this.log.error(`${name}: ${message}`);

    res.status(statusCode).json({
      name,
      errorCode,
      message,
    });
  }
}
