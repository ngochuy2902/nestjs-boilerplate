import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error-code.constant';

import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
  }
}
