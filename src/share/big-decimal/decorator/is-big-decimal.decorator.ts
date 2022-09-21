import { Transform } from 'class-transformer';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { BigDecimal } from '@share/big-decimal/big-decimal';

export const IsBigDecimal = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    Transform(({ value }) => BigDecimal.valueOf(value))(object, propertyName);

    registerDecorator({
      name: 'isBigDecimal',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return !(value && !BigDecimal.valueOf(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid number`;
        },
      },
    });
  };
};
