import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

import { QueryCleaner } from '@share/decorator/query-cleaner.decorator';
import { SortDirection } from '@share/enum/sort-direction.enum';

export class PaginationReq {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @QueryCleaner()
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  page: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @QueryCleaner()
  @ApiProperty({ required: false })
  @Transform(({ value }) => Number(value))
  pageSize: number;

  @IsOptional()
  @QueryCleaner()
  @IsEnum(SortDirection)
  @ApiProperty({ required: false, enum: SortDirection })
  sortType: SortDirection;

  @IsString()
  @IsOptional()
  @QueryCleaner()
  @ApiProperty({ required: false })
  sortField: string;
}
