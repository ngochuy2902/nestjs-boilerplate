import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { BaseEntityModel } from './base.entity';
import { UserRole } from '@entity/user-role.entity';

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

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];
}
