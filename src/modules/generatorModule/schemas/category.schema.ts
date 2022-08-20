import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activity.schema';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import ObjectId = mongoose.Schema.Types.ObjectId;

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  _id?: ObjectId;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: [ActivitySchema] })
  activities: Activity[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
