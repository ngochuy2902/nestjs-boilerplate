import { Column, Entity, Unique } from 'typeorm';

import { BaseEntityModel } from './base.entity';

@Entity('users')
export class User extends BaseEntityModel {
  @Column({ nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    default: true,
  })
  activated: boolean;
}
