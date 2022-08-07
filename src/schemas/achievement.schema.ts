import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AchievementDocument = Achievement & Document;

@Schema()
export class Achievement {
  @Prop()
  name: string;

  @Prop()
  image: string;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
