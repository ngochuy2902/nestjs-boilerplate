import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

import { CtxReq } from './request-context.dto';

export const Ctx = createParamDecorator(
  (data: unknown, executionContext: ExecutionContext): CtxReq => {
    const request = executionContext.switchToHttp().getRequest();

    return createRequestContext(request);
  },
);

export function createRequestContext(request: Request): CtxReq {
  const user = request.user;
  if (user) {
    return plainToInstance(CtxReq, user, {
      excludeExtraneousValues: true,
    });
  }

  return null;
}
