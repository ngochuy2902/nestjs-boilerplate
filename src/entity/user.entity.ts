import { Column, Entity, Unique } from 'typeorm';

import { BaseEntityModel } from './base.entity';
import { Transform } from 'class-transformer';

@Entity('users')
export class User extends BaseEntityModel {
  @Column({ nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  @Transform(({ value }) => new Date(value))
  birthday: Date;

  @Column({
    default: true,
  })
  activated: boolean;
}
