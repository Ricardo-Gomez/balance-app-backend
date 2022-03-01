import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Source } from '../sources/source.schema';
import { ExpenseTransaction } from './expense-transaction.schema';
import { IncomeTransaction } from './income-transaction.schema';

@Schema({
  discriminatorKey: 'type',
  timestamps: true,
  toObject: { getters: true },
  toJSON: { getters: true },
})
export class Transaction {
  @Transform(({ value }) => value.toString())
  @Exclude()
  _id: ObjectId;

  @Prop({
    required: true,
    type: String,
    enum: [ExpenseTransaction.name, IncomeTransaction.name],
  })
  type: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop()
  @Exclude()
  userId: string;

  @Transform(({ value }) => parseFloat(value.toString()))
  @Prop({
    type: MongooseSchema.Types.Decimal128,
    get: (value: MongooseSchema.Types.Decimal128): number => {
      return parseFloat(value.toString());
    },
  })
  amount: MongooseSchema.Types.Decimal128;

  // @Transform(({ value }) => ({ ...value }))
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Source.name })
  @Type(() => Source)
  source: Source;

  @Prop({ default: false })
  isRecurrent: boolean;

  @Prop()
  frequencyId: string;

  @Prop()
  details: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
