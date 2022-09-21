import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { RoleType } from '../../../enum/role-type';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(RoleType, { each: true })
  roles: RoleType[];
}
