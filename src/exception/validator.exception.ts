import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error-code.constant';

import { BaseException } from './base.exception';

export class ValidatorException extends BaseException {
  constructor(message: string, errorCode?: string) {
    super(message, HttpStatus.BAD_REQUEST, errorCode ?? ErrorCode.BAD_REQUEST);
  }
}
