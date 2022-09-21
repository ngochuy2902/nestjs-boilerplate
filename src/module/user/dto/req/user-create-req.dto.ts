import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { RoleType } from '../enum/role-type';

export class UserCreateReqDto {
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

  @IsOptional()
  @ApiProperty({ required: false })
  birthday: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(RoleType, { each: true })
  roles: RoleType[];
}
