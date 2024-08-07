import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RefreshTokenResDto {
  @Expose()
  @ApiProperty()
  roles: string[];

  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}
