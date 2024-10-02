import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  createdById: string;

  @Column({ nullable: true })
  deletedById: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  updatedById: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
