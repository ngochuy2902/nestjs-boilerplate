import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserContext } from '../security/user-context';

export abstract class BaseEntityModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  createdBy: number;

  @Column({ nullable: false })
  updatedBy: number;

  @CreateDateColumn({
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    onUpdate: 'now()',
    default: () => 'now()',
  })
  updatedAt: Date;

  @BeforeInsert()
  initAuditor() {
    this.createdBy = UserContext.currentUserId;
    this.updatedBy = UserContext.currentUserId;
  }

  @BeforeUpdate()
  updateAuditor() {
    this.updatedBy = UserContext.currentUserId;
  }
}
