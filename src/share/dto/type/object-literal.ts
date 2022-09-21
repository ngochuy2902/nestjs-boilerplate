import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ObjectLiteral {
  @Expose()
  @ApiProperty()
  key: string;

  @Expose()
  @ApiProperty()
  value: any;
}
