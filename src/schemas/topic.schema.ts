import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategorySchema, Category } from './category.schema';

export type TopicDocument = Topic & Document;

@Schema()
export class Topic {
  @Prop()
  name: string;

  @Prop({ type: [CategorySchema] })
  activities: Category[];
}

export const TopicSchema = SchemaFactory.createForClass(Topic);