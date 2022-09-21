import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserChangePasswordReq {
  @IsNotEmpty()
  @ApiProperty()
  currentPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
}
