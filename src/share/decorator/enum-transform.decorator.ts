import { Transform } from 'class-transformer';

export const EnumTransform = <T>(enumObj: T, defaultValue: T[keyof T]): PropertyDecorator =>
  Transform(({ value }) => (Object.values(enumObj).includes(value) ? value : defaultValue));
