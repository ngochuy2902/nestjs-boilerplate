import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityModel } from './base.entity';
import { User } from '@entity/user.entity';
import { Role } from '@entity/role.entity';

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
