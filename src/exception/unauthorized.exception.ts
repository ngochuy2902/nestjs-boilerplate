import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error-code';
export class UnauthorizedException extends BaseException {
  constructor(context: string, message: string) {
    super(context, message, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
  }
}
