import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constant/error-code';

export class AlreadyExistException extends BaseException {
  constructor(object: string) {
    super(`${object} already exists`, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
  }
}
