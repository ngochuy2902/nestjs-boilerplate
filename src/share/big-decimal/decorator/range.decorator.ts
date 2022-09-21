import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { BigDecimal } from '@share/big-decimal/big-decimal';

export const Range = (min: number, max: number, validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'rangeBigDecimal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const bigValue = BigDecimal.valueOf(value);
          const minValue = BigDecimal.valueOf(min);
          const maxValue = BigDecimal.valueOf(max);
          return bigValue && bigValue.compareTo(minValue) >= 0 && bigValue.compareTo(maxValue) <= 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be between ${min} and ${max}`;
        },
      },
    });
  };
};
