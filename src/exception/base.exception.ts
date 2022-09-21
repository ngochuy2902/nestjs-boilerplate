import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  context: string;
  errorCode: string;

  constructor(context: string, message: string, status: number, errorCode: string) {
    super(message, status);
    this.context = context;
    this.name = this.constructor.name;
    this.errorCode = errorCode;
  }
}
