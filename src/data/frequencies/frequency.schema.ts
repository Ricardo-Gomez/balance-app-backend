import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type FrequencyDocument = Frequency & Document;

@Schema()
export class Frequency {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop({ type: Object })
  name: Record<string, any>;

  @Prop({ type: Object })
  @Exclude()
  details: Record<string, any>;
}

export const FrequencySchema = SchemaFactory.createForClass(Frequency);
