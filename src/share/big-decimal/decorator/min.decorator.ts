import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { BigDecimal } from '@share/big-decimal/big-decimal';

export const Min = (min: number, validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'minBigDecimal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const bigDecimalValue = BigDecimal.valueOf(value);
          const minValue = BigDecimal.valueOf(min);
          return bigDecimalValue && bigDecimalValue.compareTo(minValue) >= 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be less than ${min}`;
        },
      },
    });
  };
};
