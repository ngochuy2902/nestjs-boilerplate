import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenReqDto {
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}
