import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ObjectLiteral {
  @Expose()
  @ApiProperty()
  key: string;

  @Expose()
  @ApiProperty()
  value: any;
}
