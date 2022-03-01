import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Source } from '../sources/source.schema';

export type ExpenseTransactionDocument = ExpenseTransaction & Document;

@Schema()
export class ExpenseTransaction {
  type: string;
  date: Date;
  userId: string;
  amount: string;
  isRecurrent: boolean;
  frequencyId: string;
  details: string;
  source: Source;

  @Prop()
  category: string;
}

export const ExpenseTransactionSchema =
  SchemaFactory.createForClass(ExpenseTransaction);
