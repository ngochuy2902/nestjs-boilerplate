import { BaseEntityModel } from './base.entity';
import { Column, Entity } from 'typeorm';
import { RoleType } from '../enum/role-type';

@Entity('roles')
export class Role extends BaseEntityModel {
  @Column({
    nullable: false,
    type: 'enum',
    enum: RoleType,
  })
  name: string;
}
