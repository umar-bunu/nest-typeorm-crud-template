import { IsBoolean, IsEmail, IsEnum } from 'class-validator';

import { BaseEntity } from 'src/utils/Entities/BaseEntity';
import { AgentRole } from 'src/utils/roles/AgentEnum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'enum', enum: Object.values(AgentRole) })
  @IsEnum(AgentRole)
  role: AgentRole;

  @Column({ default: false })
  @IsBoolean()
  isDisabled: boolean;

  // Relationship with createdBy user
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  // Relationship with deletedBy user
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deletedById' })
  deletedBy: User;

  // Relationship with updatedBy user
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: User;
}
