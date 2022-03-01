import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type SourceDocument = Source & Document;

enum SourceTypes {
  Card = 'Card',
  Cash = 'Cash',
  Other = 'Other',
}

@Schema({ toObject: { getters: true }, toJSON: { getters: true } })
export class Source {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({ enum: SourceTypes })
  paymentType: string;

  @Prop({ index: 'text' })
  @Exclude()
  owner: string;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
