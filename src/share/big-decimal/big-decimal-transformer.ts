import { ValueTransformer } from 'typeorm';

import { BigDecimal } from '@share/big-decimal/big-decimal';

export const BigDecimalTransformer: ValueTransformer = {
  to: (entityValue: BigDecimal) => (entityValue ? entityValue.toString() : null),
  from: (databaseValue: string): BigDecimal =>
    databaseValue ? BigDecimal.valueOf(databaseValue) : null,
};
