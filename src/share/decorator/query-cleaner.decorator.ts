import { Transform } from 'class-transformer';

export function QueryCleaner() {
  return Transform(({ value }) => {
    if (['null', 'undefined', ''].includes(value)) {
      return undefined;
    }
    return value;
  });
}
