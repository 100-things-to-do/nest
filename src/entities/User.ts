import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class User {
  @PrimaryColumn({ length: 80, name: 'device_id' })
  deviceId: string;

  @ManyToMany(() => Activity, (activity) => activity.users)
  @JoinTable()
  activities: Activity[];
}
