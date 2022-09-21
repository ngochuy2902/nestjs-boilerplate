import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error.code';

import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(message: any) {
    super(message, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
  }
}
