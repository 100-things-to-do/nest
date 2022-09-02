import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';

@Entity()
export class Topic {
  @PrimaryColumn({ length: 40 })
  name: string;

  @OneToMany(() => Category, (category) => category.topic)
  category: Category;
}
