import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { BaseEntityModel } from './base.entity';
import { Property } from './property.entity';

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

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];
}
