import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategorySchema, Category } from './category.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Topic, TopicSchema } from './topic.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userDeviceId: string;

  @Prop({ type: [TopicSchema] })
  topics?: Topic[];
}

export const UserSchema = SchemaFactory.createForClass(User);
