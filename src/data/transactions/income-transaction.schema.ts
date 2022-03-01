import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Source } from '../sources/source.schema';

export type IncomeTransactionDocument = IncomeTransaction & Document;

@Schema()
export class IncomeTransaction {
  type: string;
  date: Date;
  userId: string;
  amount: string;
  isRecurrent: boolean;
  frequencyId: string;
  details: string;
  source: Source;
}

export const IncomeTransactionSchema =
  SchemaFactory.createForClass(IncomeTransaction);
