import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
