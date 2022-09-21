import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenReqDto {
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}
