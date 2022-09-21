import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error-code';

export class NotFoundException extends BaseException {
  constructor(message: any) {
    super(`${message} is not found`, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
  }
}
