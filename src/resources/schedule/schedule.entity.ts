import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ISchedule } from '../../interfaces/schedule.interface';
import { ITypeormEntity } from '../../common/database/typeorm.interface';

@Entity('schedules')
export class Schedule implements ISchedule, ITypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  tourId!: string;

  @ManyToOne('Tour', 'schedules', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tourId' })
  tour!: any;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'varchar' })
  startDate!: string;

  @Column({ type: 'varchar' })
  endDate!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany('Price', 'schedule')
  prices!: any[];
}
