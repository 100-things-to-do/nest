import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';
import { JoinColumn } from 'typeorm';
import { Achievement } from './Achievement';

@Entity()
export class Activity {
  @PrimaryColumn({ length: 40 })
  name: string;

  @ManyToOne(() => Category, (category) => category, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToMany(() => User, (user) => user.activities)
  users: User[];

  @OneToOne(() => Achievement, (achievement) => achievement.activity)
  achievement: Achievement;

  @Column({ length: 50 })
  img: string;
}
