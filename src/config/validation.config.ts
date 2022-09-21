import { ValidatorOptions } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export const ValidationConfig: ValidatorOptions | Record<string, any> = {
  whitelist: true,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  skipMissingProperties: false,
  transform: true,
};
