import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Role, User } from '@entity';

import { BaseEntityModel } from './base.entity';

@Entity('userRoles')
export class UserRole extends BaseEntityModel {
  @Column()
  userId: number;

  @Column()
  roleId: number;

  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
