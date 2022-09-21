import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { UserRole } from '@entity';

import { BaseEntityModel } from './base.entity';

@Entity('users')
export class User extends BaseEntityModel {
  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  activated: boolean;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];
}
