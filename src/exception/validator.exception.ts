import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error-code';

export class ValidatorException extends BaseException {
  constructor(context: string, message: string, errorCode?: string) {
    super(context, message, HttpStatus.BAD_REQUEST, errorCode ?? ErrorCode.BAD_REQUEST);
  }
}
