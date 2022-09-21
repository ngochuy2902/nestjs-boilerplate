import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { SortDirection } from '../../enum/sort-direction.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsEnum(SortDirection, { each: true })
  sortType: SortDirection = SortDirection.ASC;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  sortField: string = 'id';
}
