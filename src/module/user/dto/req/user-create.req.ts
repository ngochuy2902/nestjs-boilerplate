import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { RoleEnum } from '@share/enum/role.enum';

export class UserCreateReq {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ enum: RoleEnum, isArray: true })
  @IsEnum(RoleEnum, { each: true })
  roles: RoleEnum[];
}
