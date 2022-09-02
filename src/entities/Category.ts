import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Activity } from './Activity';
import { Topic } from './Topic';

@Entity()
export class Category {
  @PrimaryColumn({ length: 40 })
  name: string;

  @Column({ name: 'click', default: 0 })
  click: number;

  @Column({ length: 50 })
  img: string;

  @OneToMany(() => Activity, (activity) => activity.category)
  activity: Activity;

  @ManyToOne(() => Topic, (topic) => topic, {
    onDelete: 'CASCADE',
  })
  topic: Topic;
}
