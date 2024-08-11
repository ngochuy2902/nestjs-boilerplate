import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class PropertyCreateReqDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
