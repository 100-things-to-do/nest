import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { AchievementSchema, Achievement } from './achievement.schema';
import ObjectId = mongoose.Schema.Types.ObjectId;

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  _id?: ObjectId;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Achievement' })
  achievement: ObjectId;

  @Prop()
  isRevealed: boolean;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
