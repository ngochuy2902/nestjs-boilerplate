import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationRes<T> {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  pageSize: number;

  @Expose()
  @ApiProperty()
  totalRecords: number;

  @Expose()
  @ApiProperty()
  totalPage: number;

  @Expose()
  @ApiProperty()
  records: T[];
}
