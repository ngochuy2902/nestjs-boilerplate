import { HttpStatus } from '@nestjs/common';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export const ValidationConfig: ValidationPipeOptions = {
  whitelist: true,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  skipMissingProperties: false,
  transform: true,
};
