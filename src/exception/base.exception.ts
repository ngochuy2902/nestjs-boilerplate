import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  errorCode: string;

  constructor(message: string, status: number, errorCode: string) {
    super(message, status);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
  }
}
