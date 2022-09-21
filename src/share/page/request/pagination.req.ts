import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { SortDirection } from '@share/enum/sort-direction.enum';
import { Transform } from 'class-transformer';

export class PaginationReq {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  pageSize: number = 10;

  @IsOptional()
  @ApiProperty({ required: false, enum: SortDirection })
  @IsEnum(SortDirection)
  sortType: SortDirection = SortDirection.ASC;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  sortField: string = 'id';
}
