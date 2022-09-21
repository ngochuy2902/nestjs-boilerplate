import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationReq } from '@share/page/request/pagination.req';

export class FetchUserReq extends PaginationReq {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  keyword: string;
}
