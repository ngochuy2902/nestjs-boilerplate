import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntityModel extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true })
  createdBy: number;

  @CreateDateColumn({ type: 'datetime', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column({ type: 'int', unsigned: true, nullable: true })
  updatedBy: number;

  @UpdateDateColumn({ type: 'datetime', precision: 3, nullable: true })
  updatedAt: Date;
}
