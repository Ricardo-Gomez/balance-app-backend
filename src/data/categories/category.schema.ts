import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  name: string;

  @Prop({ index: 'text' })
  @Exclude()
  owner: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
