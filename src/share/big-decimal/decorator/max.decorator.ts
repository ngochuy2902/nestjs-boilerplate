import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { BigDecimal } from '@share/big-decimal/big-decimal';

export const Max = (max: number, validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'maxBigDecimal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const bigDecimalValue = BigDecimal.valueOf(value);
          const maxValue = BigDecimal.valueOf(max);
          return bigDecimalValue && bigDecimalValue.compareTo(maxValue) <= 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be greater than ${max}`;
        },
      },
    });
  };
};
