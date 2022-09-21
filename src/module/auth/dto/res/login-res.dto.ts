import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
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
