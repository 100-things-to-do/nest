import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Topic, TopicSchema } from './topic.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  findByName: Function;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [TopicSchema] })
  activities: Topic[];
}

export const UserSchema = SchemaFactory.createForClass(User);

/*
UserSchema.methods.findByName = async function (name: string): Promise<string> {
  const userModel: Model<UserDocument>;
  console.log("doruk")
  return name;
};
 */
