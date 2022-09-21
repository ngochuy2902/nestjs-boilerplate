import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntityModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  createdBy: number;

  @CreateDateColumn({
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({ nullable: false })
  updatedBy: number;

  @UpdateDateColumn({
    onUpdate: 'now()',
  })
  updatedAt: Date;
}
