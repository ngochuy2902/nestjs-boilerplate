import { HttpException } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error.code';

export class BaseException extends HttpException {
  errorCode: string;

  constructor(message: string, status: number, errorCode: string = ErrorCode.BAD_REQUEST) {
    super(message, status);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
  }
}
