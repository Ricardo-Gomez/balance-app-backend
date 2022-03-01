import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { AuthProviders } from './auth-providers';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  id?: string;
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ enum: AuthProviders })
  @Exclude()
  provider: string;

  @Prop()
  locale: string;

  @Prop()
  @Exclude()
  hashedRefreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
