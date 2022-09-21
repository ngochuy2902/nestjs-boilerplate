import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { SortDirection } from '@share/enum/sort-direction.enum';

export class PaginationReqDto {
  constructor(data: Partial<PaginationReqDto>) {
    Object.assign(this, data);
  }

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  pageSize: number = 10;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortType: SortDirection = SortDirection.ASC;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  sortField: string = 'id';
}
