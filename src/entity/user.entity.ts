import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { UserRole } from '@entity';

import { BaseEntityModel } from './base.entity';

@Entity('users')
export class User extends BaseEntityModel {
  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  activated: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  firstLogin: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];
}
