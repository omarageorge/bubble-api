import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  receiver: string;

  @Prop({ required: true })
  source_currency: string;

  @Prop({ required: true })
  target_currency: string;

  @Prop({ required: true })
  exchange_rate: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  success: boolean;

  @Prop()
  createdAt: Date;
}

export const transactionSchema = SchemaFactory.createForClass(Transaction);
