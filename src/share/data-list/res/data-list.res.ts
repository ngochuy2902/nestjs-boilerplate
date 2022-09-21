import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DataListRes<T> {
  @Expose()
  @ApiProperty()
  totalRecords: number;

  @Expose()
  @ApiProperty()
  records: T[];
}
