import { User } from 'src/users/entities/user.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export abstract class AuditBaseEntity extends BaseEntity {
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
