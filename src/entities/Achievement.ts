import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';
import { Activity } from './Activity';

@Entity()
export class Achievement {
  @PrimaryColumn({ length: 40 })
  name: string;

  @Column({ length: 50 })
  img: string;

  @OneToOne(() => Activity, (activity) => activity.achievement, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  activity: Activity;
}
