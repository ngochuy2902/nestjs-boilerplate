import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationReqDto } from '@util/page/request/pagination-req.dto';

export class UserFetchReqDto extends PaginationReqDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  keyword: string;
}
