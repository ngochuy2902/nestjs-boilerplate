import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error-code';

export class AlreadyExistException extends BaseException {
  constructor(context: string, object: string) {
    super(context, `${object} already exists`, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
  }
}
