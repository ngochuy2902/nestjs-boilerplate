import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntityModel } from './base.entity';

@Entity('properties')
export class Property extends BaseEntityModel{
  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 255 })
  location: string;

  @ManyToOne(() => User, (user) => user.properties)
  user: User;
}
