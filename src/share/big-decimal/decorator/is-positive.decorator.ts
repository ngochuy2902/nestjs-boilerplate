import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { BigDecimal } from '@share/big-decimal/big-decimal';

export const IsPositive = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPositive',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const bigDecimalValue = BigDecimal.valueOf(value);
          return bigDecimalValue && bigDecimalValue.compareTo(BigDecimal.ZERO) > 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a positive number`;
        },
      },
    });
  };
};
