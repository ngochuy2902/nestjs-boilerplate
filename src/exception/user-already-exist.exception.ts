import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@share/constant/error-code';

export class UserAlreadyExistException extends BaseException {
  constructor(object: string) {
    super(`${object} already exists`, HttpStatus.BAD_REQUEST, ErrorCode.USER_ALREADY_EXIST);
  }
}
