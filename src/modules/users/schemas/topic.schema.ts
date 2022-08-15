import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CategorySchema, Category } from './category.schema';
import { ApiProperty } from '@nestjs/swagger';
import ObjectId = mongoose.Schema.Types.ObjectId;

export type TopicDocument = Topic & Document;

@Schema()
export class Topic {
  _id?: ObjectId;

  @Prop({ type: [CategorySchema] })
  categories?: Category[];
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
