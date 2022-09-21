import { Column, Entity, OneToMany } from 'typeorm';

import { UserRole } from '@entity';
import { RoleEnum } from '@share/enum/role.enum';

import { BaseEntityModel } from './base.entity';

@Entity('roles')
export class Role extends BaseEntityModel {
  @Column({
    type: 'enum',
    enum: RoleEnum,
  })
  name: RoleEnum;

  @OneToMany(() => UserRole, (userRole) => userRole.role, { cascade: true })
  userRoles: UserRole[];
}
