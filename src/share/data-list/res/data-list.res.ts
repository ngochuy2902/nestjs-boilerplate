import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DataListRes<T> {
  @Expose()
  @ApiProperty()
  totalRecords: number;

  @Expose()
  @ApiProperty()
  records: T[];
}
