import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  balance: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner_id: User;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
