import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordReq {
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;
}
