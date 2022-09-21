import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserChangePasswordReqDto {
  @IsNotEmpty()
  @ApiProperty()
  currentPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
}
