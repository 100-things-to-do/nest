import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActivitySchema } from './activity.schema';
import { Achievement, AchievementSchema } from './achievement.schema';

export type AchievementsDocument = Achievements & Document;

@Schema()
export class Achievements {
  @Prop({ type: [AchievementSchema] })
  achievements: Achievement[];
}

export const AchievementsSchema = SchemaFactory.createForClass(Achievements);
