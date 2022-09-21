import { BaseEntityModel } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

import { RoleEnum } from '@share/enum/role.enum';
import { UserRole } from '@entity/user-role.entity';

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
