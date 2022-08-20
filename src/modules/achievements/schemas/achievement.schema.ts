import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import ObjectId = mongoose.Schema.Types.ObjectId;

export type AchievementDocument = Achievement & Document;

@Schema()
export class Achievement {
  _id?: ObjectId;

  @Prop()
  name: string;

  @Prop()
  image: string;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
