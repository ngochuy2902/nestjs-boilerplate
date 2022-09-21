import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { ObjectLiteral } from '@share/dto/type/object-literal';

export class PaginationResDto {
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
  @ApiProperty({ isArray: true, type: ObjectLiteral })
  records: any[];
}
