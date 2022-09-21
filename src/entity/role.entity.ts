import { BaseEntityModel } from './base.entity';
import { Column, Entity } from 'typeorm';

import { RoleType } from '../module/user/dto/enum/role-type';

@Entity('roles')
export class Role extends BaseEntityModel {
  @Column({
    nullable: false,
    type: 'enum',
    enum: RoleType,
  })
  name: string;
}
