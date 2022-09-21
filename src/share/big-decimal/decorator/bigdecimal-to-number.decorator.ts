import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';

import { BigDecimal } from '@share/big-decimal/big-decimal';

export function BigDecimalToNumber() {
  return applyDecorators(
    Type(() => Number),
    Transform(({ value }) => {
      const data = BigDecimal.valueOf(value);
      return data === null || data === undefined ? null : data.toNumber();
    }),
  );
}
