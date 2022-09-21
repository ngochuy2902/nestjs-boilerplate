import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRes {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  activated: boolean;
}
