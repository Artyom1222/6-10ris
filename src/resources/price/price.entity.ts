import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IPrice } from '../../interfaces/price.interface';
import { ITypeormEntity } from '../../common/database/typeorm.interface';

@Entity('prices')
export class Price implements IPrice, ITypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  scheduleId!: string;

  @ManyToOne('Schedule', 'prices', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'scheduleId' })
  schedule!: any;

  @Column('numeric', { precision: 10, scale: 2 })
  priceValue!: number;

  @Column({ type: 'varchar' })
  priceCurrency!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
