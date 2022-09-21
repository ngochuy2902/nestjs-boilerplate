import { BaseEntityModel } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user_roles')
export class UserRole extends BaseEntityModel {
  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'role_id', nullable: false })
  roleId: number;
}
