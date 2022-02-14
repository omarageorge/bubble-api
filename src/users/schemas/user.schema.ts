import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 1000 })
  usd: number;

  @Prop({ default: 0 })
  euros: number;

  @Prop({ default: 0 })
  ngn: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
