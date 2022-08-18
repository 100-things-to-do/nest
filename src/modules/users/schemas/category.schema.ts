import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import ObjectId = mongoose.Schema.Types.ObjectId;

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  _id?: ObjectId;

  @Prop()
  activities: ObjectId[];

  @Prop()
  achievements: ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
