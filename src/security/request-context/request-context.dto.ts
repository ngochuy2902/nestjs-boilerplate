import { Expose, Transform } from 'class-transformer';

export class CtxReq {
  @Expose()
  @Transform(({ value }) => Number(value))
  userId: number;

  @Expose()
  @Transform(({ value }) => value.split(',') || [])
  roles: string[];
}
